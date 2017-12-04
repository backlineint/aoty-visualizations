<?php
/**
 * @file
 * Contains \Drupal\Console\Command\Generate\TwigExtensionCommand.
 */

namespace Drupal\Console\Command\Generate;

use Drupal\Console\Core\Command\ContainerAwareCommand;
use Drupal\Console\Command\Shared\ConfirmationTrait;
use Drupal\Console\Command\Shared\ModuleTrait;
use Drupal\Console\Command\Shared\ServicesTrait;
use Drupal\Console\Generator\TwigExtensionGenerator;
use Drupal\Console\Core\Style\DrupalStyle;
use Drupal\Console\Utils\Validator;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Drupal\Console\Extension\Manager;
use Drupal\Console\Core\Utils\ChainQueue;
use Drupal\Console\Utils\Site;
use Drupal\Console\Core\Utils\StringConverter;

/**
 * Class TwigExtensionCommand
 *
 * @package Drupal\Console\Command\Generate
 */
class TwigExtensionCommand extends ContainerAwareCommand
{
    use ModuleTrait;
    use ServicesTrait;
    use ConfirmationTrait;

    /**
     * @var Manager
     */
    protected $extensionManager;

    /**
     * @var TwigExtensionGenerator
     */
    protected $generator;

    /**
     * @var Site
     */
    protected $site;

    /**
     * @var StringConverter
     */
    protected $stringConverter;

    /**
     * @var Validator
     */
    protected $validator;

    /**
     * @var ChainQueue
     */
    protected $chainQueue;


    /**
     * TwigExtensionCommand constructor.
     *
     * @param Manager                $extensionManager
     * @param TwigExtensionGenerator $generator
     * @param StringConverter        $stringConverter
     * @param Validator              $validator
     * @param ChainQueue             $chainQueue
     */
    public function __construct(
        Manager $extensionManager,
        TwigExtensionGenerator $generator,
        Site $site,
        StringConverter $stringConverter,
        Validator $validator,
        ChainQueue $chainQueue
    ) {
        $this->extensionManager = $extensionManager;
        $this->generator = $generator;
        $this->site = $site;
        $this->stringConverter = $stringConverter;
        $this->validator = $validator;
        $this->chainQueue = $chainQueue;
        parent::__construct();
    }

    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('generate:twig:extension')
            ->setDescription($this->trans('commands.generate.twig.extension.description'))
            ->setHelp($this->trans('commands.generate.twig.extension.help'))
            ->addOption(
                'module',
                null,
                InputOption::VALUE_REQUIRED,
                $this->trans('commands.common.options.module')
            )
            ->addOption(
                'name',
                null,
                InputOption::VALUE_REQUIRED,
                $this->trans('commands.generate.twig.extension.options.name')
            )
            ->addOption(
                'class',
                null,
                InputOption::VALUE_REQUIRED,
                $this->trans('commands.common.options.class')
            )
            ->addOption(
                'services',
                null,
                InputOption::VALUE_OPTIONAL | InputOption::VALUE_IS_ARRAY,
                $this->trans('commands.common.options.services')
            )->setAliases(['gte']);
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $io = new DrupalStyle($input, $output);

        // @see use Drupal\Console\Command\Shared\ConfirmationTrait::confirmGeneration
        if (!$this->confirmGeneration($io)) {
            return 1;
        }

        $module = $input->getOption('module');
        $name = $input->getOption('name');
        $class = $this->validator->validateClassName($input->getOption('class'));
        $services = $input->getOption('services');
        // Add renderer service as first parameter.
        array_unshift($services, 'renderer');

        // @see Drupal\Console\Command\Shared\ServicesTrait::buildServices
        $build_services = $this->buildServices($services);

        $this->generator->generate($module, $name, $class, $build_services);

        $this->chainQueue->addCommand('cache:rebuild', ['cache' => 'all']);

        return 0;
    }

    /**
     * {@inheritdoc}
     */
    protected function interact(InputInterface $input, OutputInterface $output)
    {
        $io = new DrupalStyle($input, $output);

        // --module option
        $module = $input->getOption('module');
        if (!$module) {
            // @see Drupal\Console\Command\Shared\ModuleTrait::moduleQuestion
            $module = $this->moduleQuestion($io);
            $input->setOption('module', $module);
        }

        // --name option
        $name = $input->getOption('name');
        if (!$name) {
            $name = $io->ask(
                $this->trans('commands.generate.twig.extension.questions.name'),
                $module.'.twig.extension'
            );
            $input->setOption('name', $name);
        }

        // --class option
        $class = $input->getOption('class');
        if (!$class) {
            $class = $io->ask(
                $this->trans('commands.common.options.class'),
                'DefaultTwigExtension',
                function ($class) {
                    return $this->validator->validateClassName($class);
                }
            );
            $input->setOption('class', $class);
        }

        // --services option
        $services = $input->getOption('services');
        if (!$services) {
            // @see Drupal\Console\Command\Shared\ServicesTrait::servicesQuestion
            $services = $this->servicesQuestion($io);
            $input->setOption('services', $services);
        }
    }
}

<?php

namespace App\Form;

use App\Entity\Employee;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use App\Entity\Role;
use App\Repository\RoleRepository;


class EmployeeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('pseudo')
            ->add('password', PasswordType::class)
            ->add('email')
            ->add('firstName')
            ->add('lastName')
            ->add('roles',  EntityType::class, [
                    'query_builder' => function (RoleRepository $er) {
                       return $er->createQueryBuilder('u')
                           ->orderBy('u.name', 'ASC');
                    },
                    'class' => Role::class,
                    'choice_label' => 'name',
                    'label' => 'Role à attribuer',
                    'multiple' => true,
                    'expanded' => true,
                ])

        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Employee::class,
        ]);
    }
}

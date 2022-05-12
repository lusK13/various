<?php

namespace App\Form;

use App\Entity\IsInvolvedIn;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Validator\Constraints\Choice;

class IsInvolvedInType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('role', ChoiceType::class, [
                'choices' => [
                    'Film' => [
                        'Acteur' => 'acteur',
                        'Producteur' => 'producteur',
                        'Scénariste' => 'scenariste',
                        'Réalisateur' => 'realisateur',
                    ],
                    'Musique' => [
                        'Chanteur' => 'chanteur',
                        'Compositeur' => 'compositeur',
                        'Musicien' => 'musicien',
                    ],
                    'Livre' => [
                        'Auteur' => 'auteur',
                        'Editeur' => 'editeur',
                        'Illustrateur' => 'illustrateur',
                        'Narrateur' => 'narrateur'
                    ],
                    'Journal' => [
                        'Rédacteur' => 'redacteur',
                        'Producteur' => 'producteur',
                    ]
                ],
            ])
            ->add('document')
            ->add('author')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => IsInvolvedIn::class,
        ]);
    }
}

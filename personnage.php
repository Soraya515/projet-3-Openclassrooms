<?php
class Personnage
{
  private $_degats = 0; // Les dégâts du personnage.
  private $_exp = 0; // L'expérience du personnage.
  private $_force = 20; // La force du personnage (plus elle est grande, plus l'attaque est puissante).
 

  public function gagnerExperience()
{
    $this->_exp =$this->_exp + 1;
}
public function frapper(Personnage $perso)
{
$perso->_degats = $perso->_degats + $this->_force;
}

public function setForce($force)
  {
    if (!is_int($force)) // S'il ne s'agit pas d'un nombre entier.
    {
      trigger_error('La force d\'un personnage doit être un nombre entier', E_USER_WARNING);
      return;
    }
    
    if ($force > 100) // On vérifie bien qu'on ne souhaite pas assigner une valeur supérieure à 100.
    {
      trigger_error('La force d\'un personnage ne peut dépasser 100', E_USER_WARNING);
      return;
    }
    
    $this->_force = $force;
  }
  
  public function setExperience($experience)
  {
    if (!is_int($experience)) // S'il ne s'agit pas d'un nombre entier.
    {
      trigger_error('L\'expérience d\'un personnage doit être un nombre entier', E_USER_WARNING);
      return;
    }
    
    if ($experience > 100) // On vérifie bien qu'on ne souhaite pas assigner une valeur supérieure à 100.
    {
      trigger_error('L\'expérience d\'un personnage ne peut dépasser 100', E_USER_WARNING);
      return;
    }
    
    $this->_exp = $experience;
  }

public function degats()
{
    return $this->_degats;
}
public function force()
  {
    return $this->_force;
  }
  public function experience()
  {
    return $this->_exp;
  }
public function afficherPersonnage()
{
    echo 'Degats : ' . $this->_degats;
    echo '<br />';
    echo 'Force : ' . $this->_force;
    echo '<br />';
    echo 'XP : ' . $this->_exp;
}
}

$perso1 = new Personnage;
$perso2 = new Personnage;

$perso1->setForce(10);
$perso1->setExperience(2);

$perso2->setForce(90);
$perso2->setExperience(58);

$perso1->frapper($perso2);
$perso1->gagnerExperience();

$perso2->frapper($perso1);
$perso2->gagnerExperience();

$perso1->afficherPersonnage();
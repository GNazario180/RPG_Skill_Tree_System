# RPG Skill tree and Tier system



This is a text-based Node.js system for simulating a player that can level up, and unlock new tier levels, with a skill tree

that relies on the tier level of the player, with upgradable skills, and prerequisites. Built with modular, and clean, coding

practices with clean constructive comments.



#### Features



* Player: Extends Character class, which wraps around a Attribute class, to provide stats, like health, mana, strength, defense, etc.
* Level bonuses: Manages logic for calculating, stat increases when leveling up or when allocating tier points to preferred stats.
* Stat modifier: To manage and apply stat increases, based on temporary bonuses or permanent bonuses.
* Skills and Skill Tree: Handles skill logic, such as:

&nbsp;	- Skill mana cost

&nbsp;	- Skill unlock cost

&nbsp;	- Skill maxlevel

&nbsp;	- Skill description

&nbsp;	- Unlock logic, such as when hitting a new tier level you unlock new skills to unlock and upgrade, etc



### How to Run This Project



This is not an interactive command-line or GUI app. It is a code demonstration that runs from a structured main.js file.



###### To Run



1. Clone or download the full repository.
2. Open it in an IDE or any development environment of your choice.
3. Ensure all folders and files maintain their original structure.
4. Locate SkillTreeMain.js inside of the main folder and open it.
5. Run the file to simulate player creation, leveling up,

unlocking skills and upgrading skills using Skill points, Tier level up and allocating Tier points.



### Planned Features



* Make skills actually do something instead of just printing descriptions.
* Add classes such as, mage, warrior, cleric, etc.
* Add class specific skills, the have extra requirements to unlock.



### Author



Developed by Nazario--aspiring game systems designer.

[GitHub Profile](https://github.com/GNazario180)


# RPG Manager Change Log

## Version 3.3
_2022-11-23_

Version 3.3 introduces Plot Wizards (_no, not Gandalf or Raistlin_). Plot Wizards simplify the creation of a 
**Story Circle Plot** by guiding you through the steps needed to create a consistent Adventure or Act. The wizards also
encourage the creation of clues to provide the player characters a deeper interaction with the story.

![](https://github.com/carlonicora/obsidian-rpg-manager/blob/master/screenshots/3.3/3.3-Wizards.jpg)

To use the Plot Wizard you have to turn on the "_ABT/Story Circle plot structure_" in the RPG Manager settings in 
Obsidian.

Other updates:
- Link autocompletion has been enhanced
- Modal forms are prevented from closing pressing the Escape button to avoid data loss during content editing
- Inline help has been added to plots

## Version 3.2
_2022-11-10_

Version 3.2 is a minor upgrade bringing three new features to RPG Manager.

- Fantasy Calendar Integration
- Scene Builder
- Editor Window
- UI Improvements

### Fantasy Calendar

RPG Manager now supports dates created and managed by 
[Fantasy Calendar](https://github.com/fantasycalendar/obsidian-fantasy-calendar). 
In order to activate the functionality in one of your campaigns, just add the frontmatter key

```yaml
fc-calendar: "YOUR CALENDAR NAME HERE"
```

and all the dates of your campaign will be saved in Fantasy Calendar.
Please note: RPG Manager will not store your dates in the frontmatter, but will delegate their management directly to 
Fantasy Calendar.

![](https://github.com/carlonicora/obsidian-rpg-manager/blob/master/screenshots/3.2/3.2-Fantasy-Calendar.jpg)

### Scene Builder

If you use the `Scene Analyser`, this new feature will bring a smile to your face. From an `act` without scenes, you 
can now open a window where to plot all your scenes in a useful form which will help you plotting all your scenes with
an integrated `Analyser` to show you if your act is balanced and its expected duration!

![](https://github.com/carlonicora/obsidian-rpg-manager/blob/master/screenshots/3.2/3.2-Scene-Builder.jpg)

### Editor Window

Let's stop editing a temperamental YAML, shall we? With RPG Manager 3.2 all the editable texts (_like the Synopsis_) 
will now be opened in a modal window where you can write in a comfortable text area with link autocompletion!

![](https://github.com/carlonicora/obsidian-rpg-manager/blob/master/screenshots/3.2/3.2-Editor-Window.jpg)

### UI Improvements

The layout has been improved to create a better user experience. All the `element` functionalities have been grouped in 
an are below the title, where you can quickly access them. Additionally, the information on each `element` have been 
aligned to avoid confusion.

![](https://github.com/carlonicora/obsidian-rpg-manager/blob/master/screenshots/3.2/3.2-UI-Enhancements.jpg)

## Version 3.1
_2022-10-18_

Version 3.1 is a minor upgrade to RPG Manager, focusing on providing support for **multiple images per 
component**.

- Added support for multiple images
- Updated SceneModel Analyser to show better analysis
- Enhanced the metadata writer to avoid issues with links in text
- Fixed a bug that showed incorrect dates based on users' timezone 
- Fixed a bug that prevented new component being created on mobile platforms

## Version 3.0
_2022-10-12_

Version 3.0 is another major upgrade to RPG Manager and it focused on three areas:
- Data simplification
- Tag Removal
- Speed
- The addition of the SceneModel Analyser

In order to use the newest version, RPG Manager needs to update all your `components` to make them compatible with the
newest version. When you open RPG Manager v3.0 for the first time, you will be prompted to upgrade your vault. Please
ensure you make a backup copy of it before running the updater.

Also, as the changes are extremely extensive, please make sure to read the [documentation](documentation/index.md)!

**Whats' new?**
- RPG Manager does not require specific tags any longer. Everything has been moved away from your frontmatter!
- SceneModel Analyser: your personal Machine Learning tool to help you balance your acts and sessions
- Added SceneModel Types to support SceneModel analyser
- Added SceneModel timing during games to track scenes durations
- Cleanup of the data from the frontmatter
- Codeblock rewrite: all the codeblocks have been updated to be more flexible
- List of current adventure, act and session added to campaign

**Updates**
- Plots (ABT and Story Circle ) can be shown or hidden from a setting. **Please note** the new setting is switched off by default. If you use
  the [abt](documentation/plots/abt.md) and/or the [story circle](documentation/plots/storycircle.md) structure, you
  must turn the setting on to see your content
- Relationships between `components` have been completely rewritten and (in large part) automated.
- List of pronouns extended

For a full list see the [task log on github](https://github.com/carlonicora/obsidian-rpg-manager/milestone/8?closed=1)

## Version 2.0
_2022-09-27_

Version 2.0 is a major upgrade to RPG Manager, filled with new functionality and changes. Please be aware that this 
version brings changes to the structure of the plotting, renaming some of the components used in the system!

- "_old_" Sessions have been renamed to "**Acts**". The acts are part of the **plotting phase**, therefore they don't 
have any date (in-game date or real-life date)
- The Scenes received the "_in-game_" date
- A new type of "_Sessions_" have been created. They refer to real-life gaming session and are not in the plot phase 
any longer. You can add scenes from different acts to the session, leaving the relationship between scene and acts 
intact. The session is part of the **running phase**, so you can add and remove scenes depending on when you play 
them. Being part of running a game, the new sessions have the "_in-real-life_" date (for when you run the session).
- The campaign now contains the list of sessions
- The "_Notes_" have been removed completely. The idea is that you can take the note of a session inside the session: 
after all the notes are relevant for the session itself.
- When you update the plugin, the tags will be updated to reflect this change!
- In the Rpg Manager code blocks (_normal ones, not the navigation_), you can now exclude specific lists by adding a 
tag `exclude` below the type of code block to avoid showing the specific list.
- A new type of component has been added: **SubplotModel**. A subplot helps you organising Events and Clues in logical 
order. This makes accessing the information you need easier and faster. Moreover, having a list of subplots in a 
campaign makes it easy to foresee your players' decisions when they encounter Clues related to a specific subplot.
- The settings have been updated and you can now decide which fields to show in each list. Jump in the settings to know 
more
- A relationship selector has been added, so you can access all your components to easily create a relation between the 
current note and and other notes in the frontmatter
- various bug fixing

**Acts**

Acts replace old Sessions. They are used to split an adventure in more manageable chunks. The are completely in the 
**plot phase**.

**Sessions**

They have become part of the **running phase**. The relationship with the scenes is not a parent-child, but a simple 
link: one scene can be played in one session.

**Subplots**

Added to increase the manageability of side quests and to organise Events and Clues

**Lists Management**

From the RPG Manager settings in Obsidian, you can decide which fields to show in each type of list. Also, the lists 
can be excluded on a per-note basis. In each note you can edit the code block.
The Lists are also foldable for ease of scrolling.

In terms of Exclusion, in the code block you can add the following:

```
exclude: [type1, type2, ...]
```

The supported types are:
- AdventureModel
- ActModel
- SceneModel
- SessionModel
- CharacterModel
- NonPlayerCharacterComponent
- LocationModel
- EventModel
- ClueModel
- FactionModel
- MusicModel
- SubplotModel

## Version 1.2: Relationships Update
_2022-09-19_

- Relationships updated
- New `image` frontmatter element added

**Relationships**

Version 1.2 updated the way RPG Manager handles relationships between elements. All the links in a note are now 
automatically read as a relationships between elements. If you want to specify a description in the relationship, you 
can add the link in the frontmatter. In the frontmatter, the old structure has been replaced with a simple list of 
links with their description. Each link can be written as a markdown link, without the need to remove the brackets any 
longer.

```
---
[[Link to another element]]: "Relationship details"
---
```

The frontmatters have been automatically upgraded in all your notes to reflect this change.

**New image frontmatter element**
A new frontmatter element (`image`) has been added to the frontmatter. it accepts a valid url to an image, and instead 
of using a local image, RPG Manager will show the image of the `image` frontmatter. If a local image exists in the 
vault, that will be used and the `image` frontmatter will be ignored.

## version 1.2
_2022-09-12_

`MusicModel` element added.

## version 1.1
_2022-09-12_

Templating added. Please refer to the [templating](#templates) section in this document.

## version 1.0
_2022-09-10_

From version `1.0` RPG Manager does not require the Dataview plugin any longer

# Contributing

Contributions via bug reports, bug fixes, documentation, and general improvements are always welcome. For more major
feature work, make an issue about the feature idea / reach out to me so we can judge feasibility and how best to
implement it.

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=U7NBNN7ZQA2J6)

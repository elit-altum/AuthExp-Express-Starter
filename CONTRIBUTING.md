# Contribution Guidelines ⚙️

Please feel free to contribute to this repository in the form of pull requests, issues, code reviews etc. with the following in mind:

- Open source communities need to become more collaborative and inclusive.
- There should be lesser burden and special focus on first time contributors.
- Contributions should be aimed to make the project better in one form or the other.

## 01. How to contribute 🚀

1. Prerequisites:

   - Familiarity with the basics of Backend Development using NodeJS, Express Framework and MongoDB
   - Familiarity with [pull requests](https://help.github.com/articles/using-pull-requests) and [issues](https://guides.github.com/features/issues/).
   - Understanding of the basics of Git.
  
2. Procedure:
   1. Browse through the currently opened [issues](https://github.com/elit-altum/Express-Starter-With-User-Auth/issues) to find a task you'd like to work on.
   2. Feel free to open a new issue if you cannot setup the environment or find a bug in the codebase.
   3. If you wan to add a new feature to the codebase or optimise a piece of code, __please file an issue first.__ The maintainers of the repository will then review the changes/features suggested, after that you can go ahead and implement them!
   4. Code contributions should follow the contribution methodology given below.

## 02. Contribution Methodology 👨‍💻

1. __Issues__: Issue templates have been drafted for your convenience on this github repository. Please strictly abide by these guidelines and try to provide as much information as possible while filing an issue.
2. __Pull Requests__: When opening a pull request, the title of the PR should follow these guidelines:

   ```
   <summary> - <related_issue>
   ```

   - _Summary_: Add a short and descriptive statement about what this pull request changes/adds to the codebase.
   - _Related Issue_: Please only open pull requests if they fix an existing issue, if not, file an issue first and then send a PR. The issue number should be present at the end of the PR with 'I' as a prefix. For example, If a PR fixes issue 901 it should have ```-I907``` at the end.
   - _Work in progress_: If you are still working on a pull request and do not want to merge it but just need a review from others. Please add ```[WIP]``` to the start of your PR title.

   ```
    Examples:

    [WIP] - Add URL shortners for /reset - I907
    Fix mongoose connection URI bug - I507

   ``` 
3. __Commit Guidelines__ : Your commit messages should follow the following syntax:

   ```sh
   <action>: <summary of change> - <related_issue>
   ```

    - Action: It denotes the type of change made in this commit. It may include the following keywords:
      - ```fix```: If you have fixed a bug in the code.
      - ```feat```: If you have added a new feature to the existing codebase.
      - ```remove```: If you have removed a piece of code due to redundancy etc.
      - ```refactor```: If you have refactored a piece of code for optimization or readability.
      - ```docs```: *Special use* - Only use this if you are contributing to the documentations (```.md``` file).
    - Summary: It should describe a gist of the changes made in a commit. The summary should be as brief as possible, yet descriptive. You should break down every code contribution to as many commits as possible so you can find a single summary for one particular commit.
    - Issue: Every PR should be related to an issue. Please do not open pull requests directly. At the end of the commit message do mention the issue that particular commit is related to. Eg. If a commit fixes issue number 207. It should be mentioned as ```-I207``` at the end.

    ```
     Examples:

     feat: support for handling images - I107
     fix: unhandled error in imageHandler - I406
     refactor: converted switch-case to if-else in hotKeyHandler - I907 
    ```
      


## 03. General Conduct 🌱

We are committed to providing a friendly, safe and welcoming environment for
all, regardless of gender, sexual orientation, disability, ethnicity, religion,
or similar personal characteristic.

Please be kind and courteous. There's no need to be mean or rude.
Respect that people have differences of opinion and that every design or
implementation choice carries a trade-off and numerous costs. There is seldom
a right answer, merely an optimal answer given a set of values and
circumstances.

Please keep unstructured critique to a minimum. If you have solid ideas you
want to experiment with, make a fork and see how it works.

We will exclude you from interaction if you insult, demean or harass anyone.
That is not welcome behaviour. We interpret the term "harassment" as
including the definition in the
[Citizen Code of Conduct](http://citizencodeofconduct.org/);
if you have any lack of clarity about what might be included in that concept,
please read their definition. In particular, we don't tolerate behavior that
excludes people in socially marginalized groups. Private harassment is also unacceptable. Whether you're a regular contributor or a newcomer, we care about
making this community a safe place for you and we've got your back.

Likewise any spamming, trolling, flaming, baiting or other attention-stealing
behaviour is not welcome.
# yblebon.github.io
This is a personal web repository aka "Western" repository.

![Alt text](./home.jpeg "a title")


where:

- I add what I want
- I change what i want
- I commit directly to master branch if I want
- I fix bugs whenever i want.

with:
- no requirements
- no delivery date

# Example
A little taste: Link posted in a private personal whatsapp end-to-end conversation accessed by IP adresses from China and US with "Digital Ocean" machines

# Prerequisites

- The GitHub Arctic Code Vault is a data repository preserved in the Arctic World Archive (AWA), a very-long-term archival facility 250 meters deep in the permafrost of an Arctic mountain. GitHub captured a snapshot of every active public repository on 02/02/2020 and preserved that data in the Arctic Code Vault. :smile:

- **"A journal is a written record of incidents, experiences, and ideas. Also known as a personal journal notebook, diary, and log. Writers often keep journals to record observations and explore ideas that may eventually be developed into more formal essays, articles, and stories. "The personal journal is a very private document" says Brian ..." - https://www.thoughtco.com/what-is-a-journal-1691206**

- "Privacy is a fundamental human right. It’s also one of our core values. Which is why we design our products and services to protect it. That’s the kind of innovation we believe in." - https://www.apple.com/privacy/

- "L'UE est fondée sur un engagement résolu à promouvoir et protéger les droits de l'homme, la démocratie et l’État de droit partout dans le monde. Les droits de l'homme sont au cœur des relations de l'UE avec les autres pays et régions." - https://european-union.europa.eu/priorities-and-actions/actions-topic/human-rights-and-democracy_fr

- "The EU has imposed sanctions on six senior Russian officials and a chemical research centre over the Novichok poisoning of anti-Putin campaigner Alexei Navalny. " - https://www.bbc.com/news/world-europe-54552480

- "EU corruption scandal puts democracy under attack - European Parliament head" - https://www.bbc.co.uk/news/world-europe-63941509

- "Police in Brussels have raided a lockdown orgy in the basement of a gay bar – collaring 25 people, including several diplomats and a member of the European Parliament, according to reports." - https://nypost.com/2020/12/01/brussels-cops-bust-lockdown-orgy-attended-by-diplomats-reports/

- "As nouns the difference between persecutor and prosecutor is that persecutor is a person or thing that persecutes or harasses while prosecutor is a lawyer who decides whether to charge a person with a crime and tries to prove in court that the person is guilty." - https://wikidiff.com/prosecutor/persecutor

- "The couple met when Emmanuel was only 15 years old ... It is often said that Emmanuel developed very warm feelings for his teacher, and the two started a relationship, which adds that the sexual minimum age in France is 15 years. Thus, nothing illegal should have taken place." - https://timespek.com/love-story-emmanuel-and-brigitte-macron/

- "The U.S. Food and Drug Administration (FDA) has announced that new evidence has emerged linking Pfizer Covid shots to blood clotting, according to reports." - https://ussanews.com/2022/12/17/fda-pfizers-covid-shots-linked-to-blood-clotting/

# Bug Tracking

- In some cases prosecutor can be also a persecutor, when prosecutor exploits laws and his/her network in both worlds (ying and yang) to harass someone so he/her stays on governement payroll or for job promotion. For example: exploiting EU law about disease (COVID), exploiting EU laws about nationalities, exploiting laws in the countries you visit if you are travelling, etc. For instance "Pachamama" who works as a legal officer at the Office of the Prosecutor at the United Nations stuidies torture. She can use that knowledge to protect innocents people or in certain case use it to perscute (torture) mentally a victim (persecution, tricks, media, information manipulation, etc).

- Who is supposed to sanction EU if there is a poisoning attempt from EU?

- Individual supposed to feel better better in Africa bur being assaulted the first weeks.

# Behaviour Driven Development Testing
Let's show some examples of stories that we call "vespa contacts" using BDD:

### 1. User story: As a user I want to see all the entries in the vespa contacts
```
Scenario: Show all the people in the contacts list
  Given "All the requirements are satisfied and installed"
  When "I run `python3 vespa_contacts list`"
  Then "I will see all the entries in the vespa contacts"
```

### 2. User story: As a user I want to add a new entry in the vespa contacts
```
Scenario: Add another use in my contacts
  Given "All the requirements are satisfied and installed"
  When "I run `python3 vespa_contacts add <name>`"
  Then "I will add a new entry in my contacts"
  
Example:
  python3 vespa_contacts add samu
  python3 vespa_contacts add police
  python3 vespa_contacts add carrefour
  python3 vespa_contacts add caf
  python3 vespa_contacts add secu
  python3 vespa_contacts add linkedin
```

### 3. User story: As a user I want see a contact location
```
Scenario: Add another use in my contacts
  Given "All the requirements are satisfied and installed"
  When "I run `python3 vespa_contacts find <name>`"
  Then "I will see the location of that person"
  
Example:
  python3 vespa_contacts find gaia
  python3 vespa_contacts find thomas
  python3 vespa_contacts find sebastien
```





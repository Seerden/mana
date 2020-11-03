# Pondering list term display and functionality
Currently, List renders a ul of ListTerm items. 

Each ListTerm item;
- displays the front and back of the term,
- on hover: displays 'hist' button which opens up the term's review history,
- on hover: reveals 'delete' button, which when clicked opens two buttons (one to confirm term deletion, one to keep the term),
- on clicking one of the terms: allow editing the term

Thinking of refactoring such that ListTerm;
- displays front/back by default.
- on click (anywhere on the term):
  - opens modal view of the term, where the edit and delete functionality will be available, and from where history is visible.
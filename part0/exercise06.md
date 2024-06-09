```mermaid
    sequenceDiagram
    browser->>server: POST request new_note_spa containing JSON data (content + date);
    server->>browser: 201 status code (created);
```
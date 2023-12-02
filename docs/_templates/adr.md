---
creation date: <% tp.file.creation_date() %>
modification date: ' <% tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss") %>'
---
#  <% tp.file.title %>

## Status

<% tp.system.suggester(["Adopted", "Proposed", "Superseded"],["Adopted", "Proposed", "Superseded"]) %>

## Context

## Decision

## Consequences

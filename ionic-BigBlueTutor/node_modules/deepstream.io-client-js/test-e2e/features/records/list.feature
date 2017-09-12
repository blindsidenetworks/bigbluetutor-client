@records
Feature: Record Anonymous Feature

  Background:
    Given client A connects and logs into server 1
      And client B connects and logs into server 1
      And client C connects and logs into server 2
      And client D connects and logs into server 3
      And all clients get the list "listA"
      And client A sets the entries on the list "listA" to '[ "Carrot", "Tomato" ]'

  Scenario: All clients have the correct state
    Then all clients have a list "listA" with entries '[ "Carrot", "Tomato" ]'

  Scenario: Removing an entry triggers a remove and general subscribe events
    When client A removes an entry "Carrot" from "listA"
    Then all clients get notified of "Carrot" being removed from "listA"
      And all clients get notified of list "listA" entries changing to '[ "Tomato" ]'

  Scenario: Removing an entry triggers an add and general subscribe events
    When client A adds an entry "Fig" from "listA"
    Then all clients get notified of "Fig" being added to "listA"
      And all clients get notified of list "listA" entries changing to '[ "Carrot", "Tomato", "Fig" ]'

  Scenario: Updating everything within list triggers multiple add/remove events and one subscribe event
    When client A sets the entries on the list "listA" to '[ "Dates", "Apples" ]'
    Then all clients get notified of "Dates" being added to "listA"
      Then all clients get notified of "Apples" being added to "listA"
      Then all clients get notified of "Tomato" being removed from "listA"
      And all clients get notified of list "listA" entries changing to '[ "Dates", "Apples" ]'

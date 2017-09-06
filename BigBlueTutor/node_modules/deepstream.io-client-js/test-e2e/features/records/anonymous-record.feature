@records
Feature: Record Anonymous Feature

  Background:
    Given client A connects and logs into server 1
      And client A gets the record "recordA"
      And client A sets the record "recordA" and path "pet" with data 'Hamster'
      And client A gets the record "recordB"
      And client A sets the record "recordB" and path "pet" with data 'Pug'
      And client A gets a anonymous record

  Scenario: Can switch underlying records
    When client A sets the underlying record to "recordA" on the anonymous record
    Then client A anonymous record data is '{ "pet": "Hamster" }'

    When client A sets the underlying record to "recordB" on the anonymous record
    Then client A's anonymous record data is '{ "pet": "Pug" }'

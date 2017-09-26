@records
Feature: Record Has

  Background:
    Given client A connects and logs into server 1
      And client B connects and logs into server 2
      And client A gets the record "hasRecord"

  Scenario: Has returns false if data does not exist remotely
    Given client A asks if record "nonExistantRecord" exists
    Then client A gets told record "nonExistantRecord" does not exist

  Scenario: Local Has returns true
    Given client A asks if record "hasRecord" exists
    Then client A gets told record "hasRecord" exists

  Scenario: Remote Has returns false
    Given client B asks if record "hasRecord" exists
    Then client B gets told record "hasRecord" exists

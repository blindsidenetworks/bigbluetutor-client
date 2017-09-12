@records
Feature: Record Snapshots

  Background:
    Given client A connects and logs into server 1
      And client B connects and logs into server 2

    When client A gets the record "snapshotRecord"
      And client A sets the record "snapshotRecord" with data '{ "key": "value" }'

  Scenario: Snapshot returns error if data does not exist remotely
    Given client A requests a snapshot of record "nonExistantRecord"
    Then client A gets a snapshot response for "nonExistantRecord" with error 'RECORD_NOT_FOUND'

  Scenario: Local snapshot returns successfully
    When client A requests a snapshot of record "snapshotRecord"
    Then client A gets a snapshot response for "snapshotRecord" with data '{ "key": "value" }'

  Scenario: Remote snapshot returns successfully
    When client B requests a snapshot of record "snapshotRecord"
    Then client B gets a snapshot response for "snapshotRecord" with data '{ "key": "value" }'

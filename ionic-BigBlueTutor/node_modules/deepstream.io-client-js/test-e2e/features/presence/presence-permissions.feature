@presence @permissions
Feature: Presence Permissions

  Background:
    Given "complex" permissions are used
      And client A connects and logs into server 1
      And client B connects and logs into server 1

  Scenario: Clients that are not permissioned can't subscribe
    When client A subscribes to presence events
    Then client A receives "PRESENCE" error "MESSAGE_DENIED"

  Scenario: Clients that are not permissioned can't query
    When client A queries for connected clients
    Then client A receives "PRESENCE" error "MESSAGE_DENIED"

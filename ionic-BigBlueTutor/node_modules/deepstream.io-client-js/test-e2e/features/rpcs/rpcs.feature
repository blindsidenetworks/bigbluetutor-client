@rpcs
Feature: RPC providing and calling on single + across multiple nodes

  Background:
    Given client A connects and logs into server 1
      And client B connects and logs into server 1
      And client C connects and logs into server 2
      And client D connects and logs into server 3

  Scenario: Clients can call a provided RPC
    Given client A provides the RPC "addTwo"

    When client A calls the RPC "addTwo" with arguments { "numA": 1, "numB": 2 }
    Then client A receives a response for RPC "addTwo" with data 3
      And client A's RPC "addTwo" is called once

    When client B calls the RPC "addTwo" with arguments { "numA": 3, "numB": 7 }
    Then client B receives a response for RPC "addTwo" with data 10
      And client A's RPC "addTwo" is called once

    When client C calls the RPC "addTwo" with arguments { "numA": 14, "numB": 35 }
    Then client C receives a response for RPC "addTwo" with data 49
      And client A's RPC "addTwo" is called once

    When client D calls the RPC "addTwo" with arguments { "numA": "red", "numB": "rum" }
    Then client D receives a response for RPC "addTwo" with data "redrum"
      And client A's RPC "addTwo" is called once

  Scenario: When the only provider of an RPC rejects, give an error
    Given client A provides the RPC "alwaysReject"

    When client B calls the RPC "alwaysReject" with arguments { "bill": 1, "ben": 2 }

    Then client B receives a response for RPC "alwaysReject" with error "NO_RPC_PROVIDER"
      And client A's RPC "alwaysReject" is called once

  Scenario: When all providers of an RPC reject, give an error
    Given all clients provide the RPC "alwaysReject"

    When client A calls the RPC "alwaysReject" with arguments { }

    Then client A receives a response for RPC "alwaysReject" with error "NO_RPC_PROVIDER"
      And client A's RPC "alwaysReject" is called once
      And client B's RPC "alwaysReject" is called once
      And client C's RPC "alwaysReject" is called once
      And client D's RPC "alwaysReject" is called once

  Scenario: When local and remote providers exist, the local one is chosen
    Given client B provides the RPC "addTwo"
      And client C provides the RPC "addTwo"
      And client D provides the RPC "addTwo"

    When client A calls the RPC "addTwo" with arguments { "numA": 15, "numB": 10 }

    Then client A receives a response for RPC "addTwo" with data 25
      And client B's RPC "addTwo" is called once
      And client C's RPC "addTwo" is never called
      And client D's RPC "addTwo" is never called

  Scenario: When a local provider rejects an RPC but a remote provider exists, the RPC is rerouted
    Given client B provides the RPC "clientBRejects"
      And client C provides the RPC "clientBRejects"

    When client A calls the RPC "clientBRejects" with argument { "root": 3 }

    Then client A receives a response for RPC "clientBRejects" with data 9
      And client B's RPC "clientBRejects" is called once
      And client C's RPC "clientBRejects" is called once

  Scenario: If the only provider of an RPC stops providing, calls should be rejected
    Given client A provides the RPC "addTwo"

    When client D calls the RPC "addTwo" with arguments { "numA": 93, "numB": 7 }
    Then client D receives a response for RPC "addTwo" with data 100
      And client A's RPC "addTwo" is called once

    When client A unprovides the RPC "addTwo"
      And client D calls the RPC "addTwo" with arguments { "numA": 93, "numB": 7 }
    Then client D receives a response for RPC "addTwo" with error "NO_RPC_PROVIDER"
      And client A's RPC "addTwo" is never called

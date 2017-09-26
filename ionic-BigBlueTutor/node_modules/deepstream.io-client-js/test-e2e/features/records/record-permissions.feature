@records @permissions
Feature: Record Permissions

  Background:
    Given "complex" permissions are used
      And client A connects and logs into server 1
      And client B connects and logs into server 1

  Scenario: Successfully creates and updates a public record
    Given client A gets the record "public/recordOne"
      And client B gets the record "public/recordOne"
      And client B subscribes to record "public/recordOne" with path "firstname"
    When client A sets the record "public/recordOne" and path "firstname" with data 'Elton'
    Then client B receives an update for record "public/recordOne" and path "firstname" with data 'Elton'

  Scenario: Sucessfully updates record where A is only permissioned author
    Given client A gets the record "public-read-private-write/A"
      And client B gets the record "public-read-private-write/A"
      And client B subscribes to record "public-read-private-write/A" with path "firstname"
    When client A sets the record "public-read-private-write/A" and path "firstname" with data 'Elton'
    Then client B receives an update for record "public-read-private-write/A" and path "firstname" with data 'Elton'

  Scenario: Denies updates from client B on record where A is only permissioned author
    Given client A gets the record "public-read-private-write/A"
      And client B gets the record "public-read-private-write/A"
      And client A subscribes to record "public-read-private-write/A"

    When client B sets the record "public-read-private-write/A" and path "firstname" with data 'Not Elton =('

    Then client A doesn't receive an update for record "public-read-private-write/A"
      And client B receives "RECORD" error "MESSAGE_DENIED"

  Scenario: Referencing old and new data
    Given client A gets the record "only-increment"

    When client A sets the record "only-increment" with data '{"value": 0}'
      And client A sets the record "only-increment" with data '{"value": 1}'
      And client A sets the record "only-increment" with data '{"value": 3}'

      And client A sets the record "only-increment" with data '{"value": 2}'

    Then client A receives "RECORD" error "MESSAGE_DENIED"

  Scenario: Delete rules based on multiple path paramenters
    Given client A gets the record "only-delete-egon-miller/Egon/fisher"
      And client A gets the record "only-delete-egon-miller/mike/fisher"
      And client A gets the record "only-delete-egon-miller/Egon/miller"

    When client A deletes record "only-delete-egon-miller/Egon/fisher"
    Then client A receives "RECORD" error "MESSAGE_DENIED"

    When client A deletes record "only-delete-egon-miller/Egon/miller"
    Then client A gets notified of record "only-delete-egon-miller/Egon/miller" getting deleted

    When client A deletes record "only-delete-egon-miller/mike/fisher"
    Then client A receives "RECORD" error "MESSAGE_DENIED"

  Scenario: It can cross reference another record in a permission and only allows transaction for things in stock
    Given client A gets the record "item/a"
      And client A sets the record "item/a" with data '{"stock": 3}'
      And client A gets the record "item/b"
      And client A sets the record "item/b" with data '{"stock": 0}'

    When client A gets the record "only-allows-purchase-of-products-in-stock/pa"
      And client A sets the record "only-allows-purchase-of-products-in-stock/pa" with data '{"itemId": "a", "customer":"mike"}'
    # Then no errors

    When client A gets the record "only-allows-purchase-of-products-in-stock/pb"
      And client A sets the record "only-allows-purchase-of-products-in-stock/pb" with data '{"itemId": "b", "customer":"mike"}'
    Then client A receives "RECORD" error "MESSAGE_DENIED"

    When client A sets the record "item/a" with data '{"stock": 0}'
      And client A gets the record "only-allows-purchase-of-products-in-stock/pc"
      And client A sets the record "only-allows-purchase-of-products-in-stock/pc" with data '{"itemId": "a", "customer":"mike"}'
    Then client A receives "RECORD" error "MESSAGE_DENIED"

  Scenario: It correctly permissions creates
    Given client B gets the record "only-a-can-read-and-create"
      And client B receives "RECORD" error "MESSAGE_DENIED"

  Scenario: It correctly permissions reads
    Given client A gets the record "only-a-can-read-and-create"
      When client B gets the record "only-a-can-read-and-create"
      And client B receives "RECORD" error "MESSAGE_DENIED"

  Scenario: It can cross reference both create and read
    Given client A gets the record "perm/JohnDoe"
      And client A sets the record "perm/JohnDoe" with data '{"boolean": true}'

    When client A gets the record "d/u101"
    # Then no errors

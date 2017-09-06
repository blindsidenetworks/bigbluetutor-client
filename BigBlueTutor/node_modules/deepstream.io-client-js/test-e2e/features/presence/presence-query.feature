@presence
Feature: Presence querying
	Presence querying is allowing clients to query for
    other connected clients

    Background:
		Given client A connects and logs into server 1

	Scenario: Client is able to query for clients on server

		When client A queries for connected clients
            Then client A is notified that no clients are connected

        Given client B connects and logs into server 1
            And client C connects and logs into server 2

        When client A queries for connected clients
            Then client A is notified that clients "B,C" are connected

        Given client B logs out
            And client C logs out

        When client A queries for connected clients
            Then client A is notified that no clients are connected
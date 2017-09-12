@presence
Feature: Presence
	Presence is deepstream's way of allowing clients to know
	about other clients

	Scenario: Multiple client's are notified of login from other server

		Given client A connects and logs into server 1
			And client B connects and logs into server 1
			And client C connects and logs into server 2

		Then client A subscribes to presence events
			And client B subscribes to presence events
			And client C subscribes to presence events

		When client D connects and logs into server 1
			Then clients "A,B,C" are notified that client "D" logged in

	Scenario: Client is notified of multiple logins from other servers

		Given client A connects and logs into server 1
			And client A subscribes to presence events

		When client B connects and logs into server 1
			And client C connects and logs into server 2
			And client OPEN connects and logs into server 2

		Then client "A" is notified that clients "B,C" logged in

	Scenario: Multiple client's are notified of logout from other server

		Given client A connects and logs into server 1
			And client B connects and logs into server 1
			And client C connects and logs into server 2
			And client D connects and logs into server 2

		Then client A subscribes to presence events
			And client B subscribes to presence events
			And client C subscribes to presence events

		When client D logs out
			Then clients "A,B,C" are notified that client "D" logged out

	Scenario: Client is notified of multiple logouts from other servers

		Given client A connects and logs into server 1
			And client A subscribes to presence events
			And client B connects and logs into server 1
			And client C connects and logs into server 2
			And client OPEN connects and logs into server 2

		When client B logs out
			And client C logs out
			And client OPEN logs out

		Then client "A" is notified that clients "B,C" logged out


## Refactor The Read Models and Resources

We have:

- Users
	- Need to do:
		- Submit new issues.
		- Cancel pending issues.
		- Annotate non-pending issues.
		- Agree to close a resolved issue.
	- Need to see:
		- All their current issues.
		- The "details" of a non-pending issue.
			- Includes "timeline" of the issue:
				- When it was created
				- When it was assigned
				- DateTimes of various annotations
				- When it is closed.
		- Read Models
			- 
- Techs
	- Need to do:
		- Adopt a pending issue.
		- Annotate an Issue (make notes)
		- Close the issue (with comment)
		- 
	- Need to see:
		- All Unassigned Issues
		- Their current "adopted" issues


## How does it get assigned to a tech?

If the user is a "tech" - they have the `{roles: ["tech"] }` claim - they should be able to:

- See a stream of all unassigned issues.
- Reveal the user for the issue?
- "Take On" that issue.
	- `PUT /api/techs/{id}/incidents/{incidentId}`
	-   `{id: "3938", version: 18 }`
	- 

## Frontend Routing

I think the default route of `user` is sort of dumb. Not sure what I was thinking there.
Maybe the default could be `incidents`. This will make room later for other things.

## I want to simplify the UI a bit. 
- When they add an issue, maybe do it as a modal?
- The header thing makes it feel a bit "web application" - what can I do to make it more "app like"?

## The simplicity is dumb

I don't like that an issue can be filed with just a description. I think my stuff from the MSD course might be good.

- Issues are for a piece of supported software (maybe *asset*).
	- Maybe can be logged for "other".
	- Software has an "owner"
- When they select for their issue the software, perhaps a list of resolved issues for that software could be displayed?
## If they are a user (e.g. not a "Tech")

- Question: They should only be allowed to submit issues on their own behalf.
- The contact information as part of the logged incident should be connected to their *actual* contact information.
	- I can't imagine they'd want old contact information attached to an incident?

## If they are a tech

They are *also* a user, I suppose. I *think* they should be able to log issues, and log them on behalf of another user. 

Finding users by:  Last Name | Email Address 


## Hypermedia on the `/api/users/{id}`?

Thinking this can all be relative links for now.

- Could contain links to their:
	- Contact Information `/api/users/{id}/contact`
	- Incidents `/api/users/{id}/incidents`
		- Maybe this could be "staged" incidents and actually submitted incidents.
		- Is it important to differentiate the two?
			- An incident isn't put through the flow until it is [[Events#Logged]]
			- 
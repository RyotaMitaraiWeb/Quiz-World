# ChangeRoleButton

## Usage
```html
<app-change-role-button endpoint="http://localhost:7246/roles/promote/1/moderator"
color="accent" (updateUsersEvent)="myFunc()">Promote to moderator</app-change-role-button>
```
```typescript
class ChangeRoleButtonComponent {
  @Input({ required: true }) role: role = roles.moderator;
  @Input({ required: true }) userId = '';
  @Input({ required: true }) userHasRole = true;
  @Input() color: ThemePalette = 'primary';
  @Output() updateUsersEvent = new EventEmitter<IUserList>();
}
```
### @Input properties

- ``role`` - the role that will be added or removed from the user (**Required**).
- ``userId`` - the ID of the user (**Required**).
- ``userHasRole`` - whether the button will demote or promote the user (**Required**).
- ``color`` - the theme color of the button, defaults to ``primary``.

### @Output properties
- ``updateUsersEvent`` - this event is emitted when the PUT request is successful. The response body of the request will be passed as an argument.

Renders a button which, upon click, sends a PUT request to the specified ``endpoint``. If the request is successful, the button will emit an ``updateUsersEvent``, passing the response body as an argument.

## Methods
```typescript
function changeRole(event: Event): void;
```
If ``userHasRole`` is ``true``, calls the admin service's ``removeRoleFromUser`` method, passing the relevant ``@Input`` properties passed. If ``userHasRole`` is ``false``, it will do the same, but instead call ``addRoleToUser``.

When the request is successful, an ``updateUsersEvent`` is emitted with the response body.
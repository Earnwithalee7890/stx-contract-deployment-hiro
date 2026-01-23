# Contract API Reference

## Message Board

### Public Functions

#### `post-message`
Posts a new message to the board.

**Parameters:**
- `content` (string-utf8 280) - Message content

**Returns:**
- `(ok uint)` - Message ID
- `(err u*)` - Error code

**Example:**
```clarity
(contract-call? .message-board post-message u"Hello!")
```

#### `delete-message`
Deletes your own message.

**Parameters:**
- `id` (uint) - Message ID

**Returns:**
- `(ok bool)` - Success
- `(err u1)` - Not your message
- `(err u2)` - Message not found

### Read-Only Functions

#### `get-message`
Retrieves a message by ID.

**Parameters:**
- `id` (uint) - Message ID

**Returns:**
- `(optional { author, content, timestamp })`

#### `get-message-count`
Gets total message count.

**Returns:**
- `uint` - Total messages

---

## Profile Registry

### Public Functions

#### `create-profile`
Creates a user profile.

**Parameters:**
- `name` (string-ascii 50) - Username
- `bio` (string-utf8 160) - Biography

**Returns:**
- `(ok bool)` - Success
- `(err u1)` - Already has profile
- `(err u2)` - Username taken

#### `update-bio`
Updates profile bio.

**Parameters:**
- `bio` (string-utf8 160) - New bio

**Returns:**
- `(ok bool)` - Success
- `(err u3)` - No profile

### Read-Only Functions

#### `get-profile`
Gets user profile.

**Parameters:**
- `user` (principal) - User address

**Returns:**
- `(optional { name, bio, created-at })`

#### `has-profile`
Checks if user has profile.

**Parameters:**
- `user` (principal) - User address

**Returns:**
- `bool` - True if profile exists

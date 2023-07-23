# ShortenPipe
A pipe that shortens a string if it's too long

## Usage
```html
<p>{{ 'insert long text' | shorten }}</p> <!-- default max length -->
<p>{{ 'insert long text' | shorten: 30 }}</p> <!-- with a specific max length -->
```

This pipe truncates a string to a specific length and appends an ellipsis if the string's length is higher than the specified or default max length. The default max length is 50 characters. If the string is shorter than the max length, the pipe returns the same string unmodified.

## Examples
```typescript
const pipe = new ShortenPipe();
pipe.transform('short text'); // returns "short text"
pipe.transform('test', 2); // returns "te..."
```
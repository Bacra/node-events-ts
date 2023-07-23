emit-ts
=======

## Install

```shell
npm install emit-ts
```

## Usage

```typescript
import { Emit } from 'emit-ts';

const event = new Emit<{ a: number, b: string }>();
event.on(({ a }) => console.log(a));
event.once(({ b }) => console.log(b));
event.off(() => {});
event.emit({ a: 1, b: '2'});

// typescript check fail
event.on(({ c }) => console.log(c));
event.emit();
event.emit({ a: 1 });
```

export class Emit<Arg> {
  constructor() {
    this.events = [];
    this.onceEvents = [];
  }

  on(callback: (arg?: Arg) => void) {
    this.events.push(callback);
  }

  off(callback?: (arg?: Arg) => void) {
    if (callback) {
      const index = this.events.indexOf(callback);
      if (index !== -1) {
        this.events.splice(index, 1);
      }
    } else {
      this.events.length = 0;
    }
  }

  once(callback: (arg?: Arg) => void) {
    this.events.push(callback);

    this.onceEvents.push(callback);
  }

  emit(arg: Arg) {
    // 复制一份，解决删除的问题
    [...this.events].forEach((handler) => {
      if (this.events.indexOf(handler) !== -1) {
        handler(arg);
      }
    });

    if (this.onceEvents.length) {
      if (!this.events.length) {
        this.onceEvents.length = 0;
      } else {
        this.events = notFilterArray(this.events, this.onceEvents);
      }
    }
  }

  private events: Array<(arg?: Arg) => void>
  private onceEvents: Array<(arg?: Arg) => void>
}


const notFilterArray: <Item extends any>(dataArr: Item[], notArr: any[]) => Item[] = typeof Set === 'undefined'
  ? (dataArr, notArr) => dataArr.filter(item => notArr.indexOf(item) === -1)
  : (dataArr, notArr) => {
    const set = new Set(notArr);
    return dataArr.filter(item => !set.has(item));
  };


// const event = new Emit<{ a: number, b: string }>();
// event.on(({ a }) => console.log(a));
// event.once(({ b }) => console.log(b));
// event.off(() => {});
// event.emit({ a: 1, b: '2'});

// event.emit();
// event.emit({ a: 1 });
// event.on(({ c }) => console.log(c));

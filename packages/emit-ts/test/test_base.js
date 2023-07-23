const { Emit } = require('../');
const expect = require('expect.js');

describe('#base', () => {

  it('#on', () => {
    const event = new Emit();

    let count = 0;
    event.on((data) => {
      count += 1;

      if (count === 1) {
        expect(data).to.be(123);
      } else {
        expect(data).to.be(456);
      }
    });

    event.emit(123);
    event.emit(456);
  });


  it('#once', () => {
    const event = new Emit();

    let count = 0;
    event.once((data) => {
      count += 1;

      if (count === 1) {
        expect(data).to.be(123);
      } else {
        expect().fail('once run twice');
      }
    });

    event.emit(123);
    event.emit(456);
  });


  it('#off', async () => {
    const event = new Emit();
    const onedHandler = () => expect().fail('not run');
    event.on(onedHandler);
    expect(() => event.emit(123)).to.throwException();

    event.off(onedHandler);
    event.emit(123);

    event.once(onedHandler);
    event.off(onedHandler);
    event.emit(123);
  });
});

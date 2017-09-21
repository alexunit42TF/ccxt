/*  ------------------------------------------------------------------------ */

const ccxt     = require ('../ccxt')
    , assert   = require ('assert')
    , log      = require ('ololog')
    , ansi     = require ('ansicolor').nice;

/*  ------------------------------------------------------------------------ */

describe ('ccxt base code', () => {

    it ('sleep() is robust', async () => {

        for (let i = 0; i < 30; i++) {
            const before = Date.now ()
            await ccxt.sleep (10)
            const now = Date.now ()
            assert ((now - before) >= 10) // not too fast
            assert ((now - before) < 20)  // but not too slow...
        }
    })

    it ('extend () works', () => {

        const foobar = ccxt.extend (
            { 'foo': 'bar' },
            { 'bar': 'foo' },
            { 'baz': 'qux' },
            { 'qux': 'baz' })

        // for (key of foobar)

        assert ('foo' in foobar)
        assert ('bar' in foobar)
        assert ('baz' in foobar)
        assert ('qux' in foobar)

    })

    // it ('rate limiting works', async () => {

    //     const calls = []
    //     const rateLimit = 100
    //     const exchange = new ccxt.Exchange ({

    //         id: 'mock',
    //         rateLimit,
    //         enableRateLimit: true,

    //         async executeRestRequest (...args) { calls.push ({ when: Date.now (), path: args[0], args }) }
    //     })

    //     await exchange.fetch ('foo')
    //     await exchange.fetch ('bar')
    //     await exchange.fetch ('baz')

    //     await Promise.all ([
    //         exchange.fetch ('qux'),
    //         exchange.fetch ('zap'),
    //         exchange.fetch ('lol')
    //     ])

    //     assert.deepEqual (calls.map (x => x.path), ['foo', 'bar', 'baz', 'qux', 'zap', 'lol'])

    //     calls.reduce ((prevTime, call) => {
    //         log ('delta T:', call.when - prevTime)
    //         assert ((call.when - prevTime) >= rateLimit)
    //         return call.when
    //     }, 0)
    // })
})

/*  ------------------------------------------------------------------------ */
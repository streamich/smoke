import { Node, NetworkHub } from '../smoke-node/index'

// create two network nodes (a and b)
const node_a = new Node({ hub: new NetworkHub('ws://localhost:5001') })
const node_b = new Node({ hub: new NetworkHub('ws://localhost:5001') })

// start web server on node_a
const server = node_a.rest.createServer({})
server.get('/', (req, res) => {

    res.send('hello world')

}).listen(80)

// get node_a's public endpoint
node_a.address().then(address => {

    console.log('port_a address:', address)

    // node_a -> node_a (loopback)
    node_a.rest.fetch('/').then(res => res.text()).then(data => {
        console.log('node_a -> node_a (loopback)', data)
    })

    // node_a -> node_a
    node_a.rest.fetch('rest://localhost:80').then(res => res.text()).then(data => {
        console.log('node_a -> node_a', data)
    })
    
    // node_b -> node_a
    node_b.rest.fetch(`rest://${address}:80/`).then(res => res.text()).then(data => {
        console.log('node_a -> node_b', data)
    })
})

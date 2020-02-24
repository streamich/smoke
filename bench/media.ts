import { Node, NetworkHub } from '../smoke-node/index'

// Media Proxy Demo
//
// The following code sets up 4 network nodes. The first (node_a) 
// will host a live video feed, (node_b) will connect to (node_a)
// and proxy its feed. Nodes (node_c, node_d) act as media stream
// clients. The nodes are arranged into the following topology.
//
//                             +--------+
//                           /-| client |
// +--------+    +--------+ /  +--------+
// | source | -- | proxy  |     (node_c)
// +--------+    +--------+ \  +--------+
//  (node_a)      (node_b)   \-| client |
//                             +--------+
//                              (node_d)
//
// The webpage will render each video feed as it arrives at each
// node. Note: A user must interact with the webpage before video
// can play(). This rule is enforced on most browsers. Here,
// we setup a 'start' button to set things in motion.

document.getElementById('start').addEventListener('click', () => start())

async function start() {

    // Create 4 network nodes.

    const node_a = new Node({ hub: new NetworkHub('ws://localhost:5001') })
    
    const node_b = new Node({ hub: new NetworkHub('ws://localhost:5001') })

    const node_c = new Node({ hub: new NetworkHub('ws://localhost:5001') })

    const node_d = new Node({ hub: new NetworkHub('ws://localhost:5001') })

    // Obtain the virtual address of source and proxy nodes.

    const node_a_addr = await node_a.address()

    const node_b_addr = await node_b.address()

    // node_a - The video source.

    node_a.rest.createServer().get('/mediastream', (_, res) => {

        const mediastream = node_a.media.createTestPattern()

        const video = document.getElementById('video_a') as HTMLVideoElement

        video.srcObject = mediastream
        
        video.play()

        res.mediastream(mediastream)

    }).listen(80)

    // node_b - The video proxy.

    node_b.rest.createServer().get('/mediastream', async (_, res) => {

        const response = await node_b.rest.fetch(`rest://${node_a_addr}/mediastream`)

        const mediastream = await response.mediastream()

        const video = document.getElementById('video_b') as HTMLVideoElement

        video.srcObject = mediastream
        
        video.play()
        
        res.mediastream(mediastream)

    }).listen(80)

    // node_c - the client
    {
        const response = await node_c.rest.fetch(`rest://${node_b_addr}/mediastream`)

        const video = document.getElementById('video_c') as HTMLVideoElement
    
        video.srcObject = await response.mediastream()
    
        video.play()
    }


    // node_d - the client
    {
        const response = await node_c.rest.fetch(`rest://${node_b_addr}/mediastream`)

        const video = document.getElementById('video_d') as HTMLVideoElement
    
        video.srcObject = await response.mediastream()
    
        video.play()
    }

}


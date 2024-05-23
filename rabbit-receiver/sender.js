import amqplib from 'amqplib'

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672'
const QUEUE = process.env.QUEUE || 'tasks'
const INTERVAL = process.env.INTERVAL || '1000'

const run = async () => {
  const queue = QUEUE
  console.log('trying to connect to ', RABBITMQ_URL)
  const conn = await amqplib.connect(RABBITMQ_URL)
  const ch2 = await conn.createChannel()

  setInterval(() => {
    console.log('send')
    ch2.sendToQueue(queue, Buffer.from('something to do ' + Date.now()))
  }, parseInt(INTERVAL))
}

run()

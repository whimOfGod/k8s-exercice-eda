import amqplib from 'amqplib'

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672'
const QUEUE = process.env.QUEUE || 'tasks'

const run = async () => {
  const queue = QUEUE
  console.log('trying to connect to ', RABBITMQ_URL)
  const conn = await amqplib.connect(RABBITMQ_URL)

  console.log('connected to ', RABBITMQ_URL)

  const ch1 = await conn.createChannel()
  await ch1.assertQueue(queue)

  // Listener
  ch1.consume(queue, (msg) => {
    if (msg !== null) {
      console.log('Received:', msg.content.toString())
      setTimeout(() => {
        ch1.ack(msg)
        console.log('Acked:', msg.content.toString())
      }, 500)
    } else {
      console.log('Consumer cancelled by server')
    }
  })
}
run()

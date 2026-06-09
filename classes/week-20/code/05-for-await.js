const stream = {
    counter: 0,
    async next() {
        this.counter++;
        if (this.counter > 5) {
            return { done: true };
        } else {
            return { done: false, value: `Message ${this.counter}`};
        }
    },
    [Symbol.asyncIterator]() {
        return this;
    }
};
for await (const message of stream) {
    console.log("Received message:", message);
}
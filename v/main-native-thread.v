import time

fn main() {
	mut thread := []thread string{}

	for index := 0; index < 1000; index++ {
		thread << go fn (index int) string {
			time.sleep(1000 * time.millisecond)
			return 'promise $index'
		}(index)
	}

	promises := thread.wait()
	println(promises)
}

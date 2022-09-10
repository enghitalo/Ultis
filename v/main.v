import json

struct Employee {
	name string
	age  int
}

fn main() {
	json_response := '{"name":"Peter","age":28,"salary":95000.5,"title":2}'
	json_response_decode := json.decode(Employee, json_response)?
	json_response_encode := json.encode(json_response_decode)

	if json_response != json_response_encode {
		eprintln('json_response not fill well the "Employee" struct, What can result in performance problems')
	}
}

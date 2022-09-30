type Any = string | u8 | map[string]string | map[string]u8

fn main() {
	mapa := u8(9)
	lala({"mapa":Any(mapa),"mapa2":Any("mapa")})
}

fn lala (arg map[string]Any) {
	println(arg)
}
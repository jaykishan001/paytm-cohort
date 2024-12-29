import Button from "./Button";

function Header () {
    return (
            <div className="flex justify-between p-4">
                <div>
                    <h1 className="text-xl font-bold">Payments App</h1>
                </div>
                <div className="">
                    <ul className="flex gap-4 items-center">
                        <li>
                          <p>Hello, User</p>
                        </li>
                        <li>
                            <Button className="border rounded-full w-8 h-8 bg-gray-300" />
                        </li>
                    </ul>
                </div>

            </div>
    )
}
export default Header;
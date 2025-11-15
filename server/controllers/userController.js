const userProfile = async (req, res) => {
    // console.log(req)
    // res.json(req.user);

    res.send(req.user)
    console.log(req.user)       // Do something with these data, to fetch the user info

}
export { userProfile }

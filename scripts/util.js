const fs = require('fs');

const addAddress = (name, address) => {
    if (!fs.existsSync('deployments.json')) {
        fs.writeFileSync('deployments.json', '{}');
    }
    const jsonData = fs.readFileSync('deployments.json', 'utf8');
    const data = JSON.parse(jsonData);
    data[name] = address;
    fs.writeFileSync('deployments.json', JSON.stringify(data, null, 2));
}

const getAddress = (name) => {
    const jsonData = fs.readFileSync('deployments.json', 'utf8');
    const data = JSON.parse(jsonData);
    return data[name];
}

const toWei = (amount) => {
    const wad = hre.ethers.utils.parseEther("1000000000000000000");
    return wad.mul(amount);
}

module.exports = {
    addAddress,
    getAddress,
    toWei,
};
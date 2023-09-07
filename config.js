const config={
    production:{
        SECRET:process.env.SECRET,
        DATABASE:process.env.MONGODB_URI,
        DATABASE_SUFFIX:process.env.DATABASE_SUFFIX
    },
    default:{
        SECRET:'mysecretkey',
        DATABASE:'mongodb://127.0.0.1:27017/',
        DATABASE_SUFFIX:''
    }
}
exports.get=function get(env){
    return config[env]||config.default
}


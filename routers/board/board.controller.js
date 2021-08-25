const { Board, sequelize } = require('../../models/index');

let main = (req,res) => {
    console.log('/board 접근중');

    res.render('board/main.html');
}

let list = async (req,res) => {
    console.log('/board/list 접근중');

    let result = await sequelize.query(`select id, title, content, date_format(date, '%Y-%m-%d') as date, hit from board`)
    .then(result => {
        res.render('board/list.html', {
            result: result[0],
        });
    })
    .catch(e => {
    	console.log(e);
    })
}

let view = async (req,res) => {
    console.log('/board/view 접근중');

    let result = await sequelize.query(`update board set hit=hit+1 where id=${req.query.id}`)
    .then(data => {
        if (data[0].changedRows > 0){
            let result = sequelize.query(`select id, title, content, date_format(date, '%Y-%m-%d') as date, hit from board where id='${req.query.id}'`)
            .then(result => {
                res.render('board/view.html', {
                    result: result[0],
                });
            })
            .catch(e => {
                console.log(e);
            })
        }
    })
    .catch(e => {
    	console.log(e);
    })
}

let writeGet = (req,res) => {
    console.log('/board/write Get 접근중');
    
    res.render('board/write.html');
}

let writePost = async (req,res) => {
    console.log('/board/write Post 접근중');

    let { title, content } = req.body;

    let result = await Board.create({
        title, content,
    })
    .then(result => {
        res.redirect('/board/list');
    })
    .catch(e => {
    	console.log(e);
    })
}

let modifyGet = (req,res) => {
    console.log('/board/modify Get 접근중');

    let result = sequelize.query(`select id, title, content, date_format(date, '%Y-%m-%d') as date, hit from board where id='${req.query.id}'`)
    .then(result => {
        res.render('board/modify.html', {
            result: result[0],
        });
    })
    .catch(e => {
    	console.log(e);
    })
}

let modifyPost = async (req,res) => {
    console.log('/board/modify Post 접근중');

    let { id, title, content } = req.body;

    let result = await Board.update({
        title, content,
    },{
        where:{
            id: id,
        }
    })
    .then(result => {
        res.redirect(`/board/view?id=${id}`);
    })
    .catch(e => {
    	console.log(e);
    })
}

let remove = async (req,res) => {
    console.log('/board/remove 접근중');

    let { id } = req.query;

    let result = await Board.destroy({
        where:{
            id: id,
        }
    })
    .then(result => {
        res.redirect('/board/list');
    })
    .catch(e => {
    	console.log(e);
    })
}

module.exports = {
    main,
    list,
    view,
    writeGet, writePost,
    modifyGet, modifyPost,
    remove,
}
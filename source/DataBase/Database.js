import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Tarefa.db";
const database_version = "1.0";
const database_displayname = "Tarefa Database";
const database_size = 200000;

export default class Database {

    Conectar() {
        let db;
        return new Promise((resolve) => {
            console.log("Checando a integridade do plugin ...");
            SQLite.echoTest().then(() => {
                console.log("Integridade Ok ...");
                console.log("Abrindo Banco de Dados ...");
                SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
                    db = DB;
                    console.log("Banco de dados Aberto");
                    db.executeSql('SELECT 1 FROM Tarefa LIMIT 1').then(() => {
                        console.log("O banco de dados está pronto ... Executando Consulta SQL ...");
                    }).catch((error) => {
                        console.log("Erro Recebido: ", error);
                        console.log("O Banco de dados não está pronto ... Criando Dados");
                        db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Tarefa (id INTEGER PRIMARY KEY AUTOINCREMENT, tarefa varchar(30), detalhes varchar(30), data varchar(100), situacao varchar(2))');
                        }).then(() => {
                            console.log("Tabela criada com Sucesso");
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                    resolve(db);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log("echoTest Falhou - plugin não funcional");
            });
        });
    };

    Desconectar(db) {
        if (db) {
            console.log("Fechando Banco de Dados");
            db.close().then(status => {
                console.log("Banco de dados Desconectado!!");
            }).catch(error => {
                this.errorCB(error);
            });
        } else {
            console.log("A conexão com o banco não está aberta");
        }
    };

    Listar() {
        return new Promise((resolve) => {
            const tarefas = [];
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT t.id, t.tarefa, t.detalhes, t.data, t.situacao FROM Tarefa t', []).then(([tx, resultados]) => {
                        console.log("Consulta completa");
                        var len = resultados.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = resultados.rows.item(i);
                            const { id, tarefa, detalhes, data, situacao } = row;
                            tarefas.push({ id, tarefa, detalhes, data, situacao });
                        }
                        console.log(tarefas);
                        resolve(tarefas);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    };

    BuscarPorId(id) {
        console.log(id);
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM Tarefa WHERE id = ?', [id]).then(([tx, resultados]) => {
                        console.log(resultados);
                        if (resultados.rows.length > 0) {
                            let row = resultados.rows.item(0);
                            resolve(row);
                        }
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    Adicionar(tar) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Tarefa VALUES (?, ?, ?, ?, ?)', [tar.id, tar.tarefa, tar.detalhes, tar.data, tar.situacao]).then(([tx, resultados]) => {
                        resolve(resultados);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    };

    // Alterar(id, tar) {
    //     return new Promise((resolve) => {
    //         this.Conectar().then((db) => {
    //             db.transaction((tx) => {
    //                 tx.executeSql('UPDATE Tarefa SET tarefa = ?, detalhes = ?, data = ?, situacao = ? WHERE id = ?', [tar.tarefa, tar.detalhes, tar.data, tar.situacao, id]).then(([tx, resultados]) => {
    //                     resolve(resultados);
    //                 });
    //             }).then((result) => {
    //                 this.Desconectar(db);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     });
    // }

    Atrasar(id) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {        
                    tx.executeSql("UPDATE Tarefa SET situacao = 'Atrasado' WHERE id = ?", [id]).then(([tx, results]) => {          
                    resolve(results);        
                });      
            }).then((result) => {        
                  this.Desconectar(db);      
                }).catch((err) => {        
                  console.log(err);      
                });    
            }).catch((err) => {     
                console.log(err);    
            });  
        });  
    }

    Adiantar(id) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {        
                    tx.executeSql("UPDATE Tarefa SET situacao = 'Adiantado' WHERE id = ?", [id]).then(([tx, results]) => {          
                    resolve(results);        
                });      
            }).then((result) => {        
                  this.Desconectar(db);      
                }).catch((err) => {        
                  console.log(err);      
                });    
            }).catch((err) => {     
                console.log(err);    
            });  
        });  
    }

    Deletar(id) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('DELETE FROM Tarefa WHERE id = ?', [id]).then(([tx, resultados]) => {
                        console.log(resultados);
                        resolve(resultados);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    };
}
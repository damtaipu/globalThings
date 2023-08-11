import { Injectable } from "@angular/core";
import { SQLiteObject } from "@ionic-native/sqlite";
import { DatabaseService } from "./sqlite-database.service";

@Injectable()
export class SaveDataHeroeService {
  constructor(private dbProvider: DatabaseService) {}

  public insert(heroe: any) {    
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into cadHeroes (name, category, active) values (?, ?, ?)';
        let data = [heroe.Name, heroe.CategoryId, heroe.Active ? 1 : 0];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

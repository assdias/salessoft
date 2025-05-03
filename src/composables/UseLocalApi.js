import { SQLiteConnection } from '@capacitor-community/sqlite'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const dbName = process.env.DB_NAME
const db = ref(null)
const sqliteConnection = ref(null)

export const useLocalApi = () => {
  const initDb = async () => {
    // Se já temos uma conexão, retorna
    if (db.value) return

    try {
      if (!sqliteConnection.value) {
        sqliteConnection.value = new SQLiteConnection()
      }

      db.value = await sqliteConnection.value.createConnection(dbName, false, 'no-encryption', 1)

      await db.value.open()

      console.log('Banco de dados inicializado com sucesso')
    } catch (error) {
      console.error('Erro ao inicializar banco de dados:', error)
      throw error
    }
  }

  const closeConnection = async () => {
    if (db.value) {
      try {
        await db.value.close()
        await sqliteConnection.value.closeConnection(dbName)
        db.value = null
        console.log('Conexão fechada com sucesso')
      } catch (error) {
        console.error('Erro ao fechar conexão:', error)
      }
    }
  }

  /**
   * Sincroniza a estrutura de uma tabela com o modelo definido
   */
  const syncTableStructure = async (modelClass) => {
    await initDb()
    const tableName = modelClass.tableName
    const columnsModel = modelClass.columns

    const createSQL = Object.entries(columnsModel)
      .map(([col, def]) => `${col} ${def}`)
      .join(', ')
    await db.value.execute(`CREATE TABLE IF NOT EXISTS ${tableName} (${createSQL})`)

    const res = await db.value.query(`PRAGMA table_info(${tableName})`)
    const existingCols = res.values.map((row) => row.name)

    const missingCols = Object.keys(columnsModel).filter((col) => !existingCols.includes(col))

    for (const col of missingCols) {
      const alterSQL = `ALTER TABLE ${tableName} ADD COLUMN ${col} ${columnsModel[col]}`
      await db.value.execute(alterSQL)
      console.log(`[syncTableStructure] Coluna adicionada: ${col}`)
    }

    if (missingCols.length === 0) {
      console.log(`[syncTableStructure] Nenhuma alteração necessária para tabela ${tableName}`)
    }
  }

  /**
   * Sincroniza múltiplas tabelas com os modelos definidos
   */
  const syncTables = async (modelClasses) => {
    for (const modelClass of modelClasses) {
      await syncTableStructure(modelClass)
    }
  }

  /**
   * Encontra um registro pelo valor de uma coluna específica
   */
  const findOn = async (tableName, columnName, value) => {
    await initDb()
    const result = await db.value.query(`SELECT * FROM ${tableName} WHERE ${columnName} = ?`, [
      value,
    ])
    return result.values[0]
  }

  /**
   * Retorna todos os registros de uma tabela
   */
  const findAll = async (tableName) => {
    await initDb()
    const result = await db.value.query(`SELECT * FROM ${tableName}`)
    return result.values
  }

  /**
   * Insere um novo registro na tabela
   */
  const post = async (tableName, data, modelClass = null) => {
    await initDb()

    // Se o modelClass foi passado e tem a coluna 'id' como TEXT PRIMARY KEY e o data.id está ausente
    if (
      modelClass &&
      modelClass.columns?.id?.toUpperCase().includes('TEXT') &&
      modelClass.columns?.id?.toUpperCase().includes('PRIMARY KEY') &&
      !data.id
    ) {
      data.id = uuidv4()
    }

    const columns = Object.keys(data).join(', ')
    const placeholders = Object.keys(data)
      .map(() => '?')
      .join(', ')
    const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`
    const values = Object.values(data)

    await db.value.run(sql, values)
    return data
  }

  /**
   * Atualiza um registro existente na tabela
   */
  const update = async (tableName, id, data) => {
    await initDb()
    const columns = Object.keys(data)
      .map((c) => `${c} = ?`)
      .join(', ')
    const sql = `UPDATE ${tableName} SET ${columns} WHERE id = ?`
    const values = Object.values(data).concat(id)
    await db.value.run(sql, values)
    return data
  }

  /**
   * Remove um registro da tabela
   */
  const remove = async (tableName, id) => {
    await initDb()
    const sql = `DELETE FROM ${tableName} WHERE id = ?`
    await db.value.run(sql, [id])
  }

  /**
   * Executa uma consulta SQL personalizada
   */
  const executeQuery = async (sql, params = []) => {
    await initDb()
    return await db.value.query(sql, params)
  }

  /**
   * Executa um comando SQL que não retorna resultados
   */
  const executeCommand = async (sql, params = []) => {
    await initDb()
    return await db.value.execute(sql, params)
  }

  return {
    initDb,
    closeConnection,
    syncTables,
    syncTableStructure,
    findOn,
    findAll,
    post,
    update,
    remove,
    executeQuery,
    executeCommand,
  }
}

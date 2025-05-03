import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export const findOn = async (tableName, columnName, value) => {
  try {
    const { data } = await supabase.from(tableName).select('*').eq(columnName, value).single()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const findAll = async (tableName) => {
  try {
    const { data } = await supabase.from(tableName).select('*').single()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const post = async (tableName, data) => {
  try {
    const { data: createdData } = await supabase.from(tableName).insert(data).single()
    return createdData
  } catch (error) {
    console.log(error)
  }
}

export const remove = async (tableName, id) => {
  try {
    const { data: deletedData } = await supabase.from(tableName).delete().eq('id', id).single()
    return deletedData
  } catch (error) {
    console.log(error)
  }
}

export const update = async (tableName, id, data) => {
  try {
    const { data: updatedData } = await supabase.from(tableName).update(data).eq('id', id).single()
    return updatedData
  } catch (error) {
    console.log(error)
  }
}

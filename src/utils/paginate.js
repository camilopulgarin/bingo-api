const paginate = async (model, query, page = 1, limit = 10) => {
    try {
      const offset = (page - 1) * limit;
      const { count, rows } = await model.findAndCountAll({
        ...query,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });
  
      return {
        total: count,
        page: parseInt(page, 10),
        totalPages: Math.ceil(count / limit),
        data: rows,
      };
    } catch (error) {
      console.error('Pagination error:', error);
      throw new Error('Pagination failed');
    }
  };
  
  module.exports = paginate;
  
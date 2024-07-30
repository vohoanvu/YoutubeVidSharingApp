﻿using Microsoft.EntityFrameworkCore;

namespace SampleAspNetReactDockerApp.Server.Helpers
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(object id);
        Task AddAsync(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
    }


    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly DbContext _context;
        private readonly DbSet<TEntity> _dbSet;

        public Repository(DbContext context)
        {
            _context = context;
            _dbSet = context.Set<TEntity>();
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<TEntity> GetByIdAsync(object id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task AddAsync(TEntity entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Update(TEntity entity)
        {
            _dbSet.Update(entity);
        }

        public void Delete(TEntity entity)
        {
            _dbSet.Remove(entity);
        }
    }
}

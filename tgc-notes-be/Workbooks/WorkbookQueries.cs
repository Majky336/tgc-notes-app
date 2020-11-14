using ConferencePlanner.GraphQL;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using tgc_notes_be.Database;

namespace tgc_notes_be.Workbooks
{
    [ExtendObjectType(Name = "Query")]
    public class WorkbookQueries
    {
        [UseApplicationDbContext]
        public Task<List<Workbook>> GetWorkbooks([ScopedService] ApplicationDbContext context) => context.Workbooks.ToListAsync();

        [UseApplicationDbContext]
        public Task<Workbook> GetWorkbook(string id, [ScopedService] ApplicationDbContext context)
        {
            var workbook = context.Workbooks.FirstOrDefaultAsync(e => e.Id == id);

            return workbook;
        }

    }
}
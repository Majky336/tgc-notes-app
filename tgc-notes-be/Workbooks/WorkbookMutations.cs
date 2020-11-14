using ConferencePlanner.GraphQL;
using HotChocolate;
using HotChocolate.Types;
using System.Threading.Tasks;
using tgc_notes_be.Database;
using System;

namespace tgc_notes_be.Workbooks
{
    [ExtendObjectType(Name = "Mutation")]
    public class WorkbookMutations
    {
        [UseApplicationDbContext]
        public async Task<AddWorkbookPayload> AddWorkbookAsync(
            AddWorkbookInput input,
            [ScopedService] ApplicationDbContext context)
        {
            var workbook = new Workbook
            {
                Name = input.Name,
                Description = input.Description,
                CreatedAt = DateTime.Now,
            };

            context.Workbooks.Add(workbook);
            await context.SaveChangesAsync();

            return new AddWorkbookPayload(workbook);
        }
    }
}

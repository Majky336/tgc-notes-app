using System.Reflection;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using tgc_notes_be.Database;
using tgc_notes_be.Extensions;

namespace ConferencePlanner.GraphQL
{
    public class UseApplicationDbContextAttribute : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(
            IDescriptorContext context,
            IObjectFieldDescriptor descriptor,
            MemberInfo member)
        {
            descriptor.UseDbContext<ApplicationDbContext>();
        }
    }
}
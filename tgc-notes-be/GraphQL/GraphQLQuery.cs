using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.IO;

namespace tgc_notes_be.GraphQL
{
    public class GraphQLQuery
    {
        public string OperationName { get; set; }
        public string NamedQuery { get; set; }
        public string Query { get; set; }
        public Dictionary<string, object> Variables { get; set; }
        // public JObject Variables { get; set; }
    }
}

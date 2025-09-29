// Complete article data with full professional content
export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorBio: string;
  authorImage: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  likes: number;
  views: number;
  publishedAt: string;
  updatedAt: string;
}

export const articlesData: Article[] = [
  {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    excerpt: "Learn how to structure large-scale React applications using TypeScript, modern patterns, and best practices for maintainable code.",
    content: `
# Building Scalable React Applications with TypeScript

In the rapidly evolving landscape of modern web development, creating scalable React applications has become a cornerstone skill for frontend developers. When combined with TypeScript, React becomes even more powerful, offering type safety, better developer experience, and improved maintainability at scale.

## Introduction

React has revolutionized how we think about building user interfaces, but as applications grow in complexity, maintaining code quality and ensuring type safety becomes increasingly challenging. TypeScript addresses these challenges by bringing static typing to JavaScript, catching errors at compile time rather than runtime.

## Setting Up Your TypeScript React Project

### Project Structure

A well-organized project structure is the foundation of any scalable application. Here's the recommended structure for a TypeScript React project:

\`\`\`
src/
├── components/
│   ├── ui/
│   ├── forms/
│   └── layout/
├── hooks/
├── services/
├── types/
├── utils/
├── contexts/
└── pages/
\`\`\`

### TypeScript Configuration

Your \`tsconfig.json\` should be configured to enforce strict type checking:

\`\`\`json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  }
}
\`\`\`

## Component Architecture Patterns

### 1. Compound Components

Compound components provide a flexible and reusable pattern for building complex UI components:

\`\`\`typescript
interface TabsProps {
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> & {
  TabPane: React.FC<TabPaneProps>;
} = ({ defaultActiveKey, onChange, children }) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || '');
  
  const handleTabChange = (key: string) => {
    setActiveKey(key);
    onChange?.(key);
  };

  return (
    <TabsContext.Provider value={{ activeKey, onChange: handleTabChange }}>
      {children}
    </TabsContext.Provider>
  );
};
\`\`\`

### 2. Higher-Order Components (HOCs) with TypeScript

HOCs can be powerful when properly typed:

\`\`\`typescript
function withLoading<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P & WithLoadingProps> {
  return ({ isLoading, ...props }: WithLoadingProps) => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    return <Component {...(props as P)} />;
  };
}
\`\`\`

## State Management at Scale

### Context API with TypeScript

For medium to large applications, properly typed context is crucial:

\`\`\`typescript
interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
\`\`\`

### Redux Toolkit with TypeScript

For complex state management, Redux Toolkit provides excellent TypeScript support:

\`\`\`typescript
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});
\`\`\`

## Performance Optimization Strategies

### 1. Component Memoization

Use React.memo and useMemo strategically:

\`\`\`typescript
const ExpensiveComponent = React.memo<ExpensiveComponentProps>(
  ({ data, onItemClick }) => {
    const processedData = useMemo(() => {
      return data.map(item => ({
        ...item,
        processed: expensiveCalculation(item)
      }));
    }, [data]);

    return (
      <div>
        {processedData.map(item => (
          <ItemComponent 
            key={item.id} 
            item={item} 
            onClick={onItemClick}
          />
        ))}
      </div>
    );
  }
);
\`\`\`

### 2. Lazy Loading and Code Splitting

Implement route-based code splitting:

\`\`\`typescript
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
\`\`\`

## Error Handling and Type Safety

### Error Boundaries with TypeScript

Create typed error boundaries for better error handling:

\`\`\`typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<
  PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
\`\`\`

## Testing Strategies

### Unit Testing with React Testing Library

Write comprehensive tests for your TypeScript React components:

\`\`\`typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com'
  };

  it('renders user information correctly', () => {
    render(<UserProfile user={mockUser} />);
    
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = jest.fn();
    render(<UserProfile user={mockUser} onEdit={mockOnEdit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });
});
\`\`\`

## Advanced TypeScript Patterns

### Generic Components

Create reusable components with generics:

\`\`\`typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick
}: DataTableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} onClick={() => onRowClick?.(item)}>
            {columns.map(column => (
              <td key={column.key}>
                {column.render ? column.render(item[column.key], item) : item[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
\`\`\`

## Deployment and Build Optimization

### Production Build Configuration

Optimize your build for production:

\`\`\`json
{
  "scripts": {
    "build": "react-scripts build",
    "build:analyze": "npm run build && npx bundle-analyzer build/static/js/*.js"
  }
}
\`\`\`

### Environment Configuration

Use environment variables for different deployment stages:

\`\`\`typescript
interface Config {
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  debugMode: boolean;
}

const config: Config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  environment: (process.env.REACT_APP_ENV as Config['environment']) || 'development',
  debugMode: process.env.REACT_APP_DEBUG === 'true'
};

export default config;
\`\`\`

## Best Practices and Common Pitfalls

### Do's:
- Always define interfaces for props and state
- Use strict TypeScript configuration
- Implement proper error boundaries
- Write comprehensive tests
- Use meaningful component and variable names
- Implement proper loading and error states

### Don'ts:
- Avoid using \`any\` type unless absolutely necessary
- Don't ignore TypeScript warnings
- Avoid deeply nested component structures
- Don't forget to handle edge cases
- Avoid inline styles for complex styling

## Conclusion

Building scalable React applications with TypeScript requires careful planning, proper architecture, and adherence to best practices. By following the patterns and strategies outlined in this article, you can create maintainable, type-safe applications that scale effectively with your team and business needs.

The investment in proper TypeScript setup and patterns pays dividends as your application grows, providing better developer experience, fewer runtime errors, and improved code maintainability.

Remember that scalability isn't just about handling more users or data – it's also about making your codebase maintainable and extensible as your development team grows and requirements evolve.

## Further Reading

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [React Performance Optimization](https://reactjs.org/docs/optimizing-performance.html)
- [Testing React Applications](https://testing-library.com/docs/react-testing-library/intro/)
`,
    author: "Jireh Custodio",
    authorBio: "Computer Engineering graduate and Full-Stack Developer specializing in cloud computing, cybersecurity, and modern web technologies. Currently working as IT Support Engineer at LGU Naga City.",
    authorImage: "/authors/jireh-custodio.jpg",
    date: "2025-01-15",
    readTime: "12 min read",
    category: "Development",
    tags: ["React", "TypeScript", "Architecture", "Scalability", "Best Practices"],
    image: "/blog/react-typescript-hero.jpg",
    featured: true,
    likes: 124,
    views: 2847,
    publishedAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "The Future of Web Development: What's Coming in 2025",
    excerpt: "Exploring emerging technologies, frameworks, and trends that will shape web development in the coming year.",
    content: `
# The Future of Web Development: What's Coming in 2025

The web development landscape continues to evolve at breakneck speed, with new technologies, frameworks, and paradigms emerging constantly. As we look ahead to 2025, several key trends are poised to reshape how we build, deploy, and interact with web applications.

## Introduction

Web development has come a long way since the early days of static HTML pages. Today's web applications are sophisticated, interactive experiences that rival native desktop and mobile applications. As we enter 2025, the convergence of artificial intelligence, edge computing, and advanced web standards is creating unprecedented opportunities for developers.

## AI-Powered Development Tools

### Code Generation and Assistance

Artificial Intelligence is revolutionizing how we write code. Tools like GitHub Copilot, ChatGPT, and specialized coding assistants are becoming integral parts of the development workflow:

\`\`\`typescript
// AI-assisted code generation example
interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: boolean;
}

// AI can help generate complete functions based on comments
// Generate a function to validate user preferences
function validateUserPreferences(prefs: Partial<UserPreferences>): UserPreferences {
  return {
    theme: prefs.theme || 'auto',
    language: prefs.language || 'en',
    notifications: prefs.notifications ?? true
  };
}
\`\`\`

### Automated Testing and Quality Assurance

AI is also transforming testing strategies:

- **Automated test generation** based on user behavior patterns
- **Visual regression testing** using computer vision
- **Performance optimization** suggestions based on real-world usage data
- **Accessibility auditing** powered by machine learning models

## WebAssembly (WASM) Goes Mainstream

### Performance-Critical Applications

WebAssembly is enabling high-performance applications directly in the browser:

\`\`\`rust
// Rust code compiled to WebAssembly
#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    match n {
        0 | 1 => n,
        _ => fibonacci(n - 1) + fibonacci(n - 2)
    }
}
\`\`\`

### Use Cases Expanding

- **Game engines** running at near-native performance
- **Image and video processing** in real-time
- **Scientific computing** applications
- **Cryptocurrency mining** and blockchain applications
- **Legacy application migration** from desktop to web

## Edge Computing and Serverless Architecture

### Edge-First Development

The shift toward edge computing is changing how we architect web applications:

\`\`\`typescript
// Edge function example (Vercel Edge Runtime)
import { NextRequest } from 'next/server';

export default function handler(req: NextRequest) {
  const country = req.geo?.country || 'US';
  const city = req.geo?.city || 'Unknown';
  
  return new Response(JSON.stringify({
    message: \`Hello from \${city}, \${country}!\`,
    timestamp: new Date().toISOString(),
    edge: true
  }), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=60'
    }
  });
}
\`\`\`

### Benefits of Edge Computing

- **Reduced latency** by processing data closer to users
- **Improved scalability** with distributed computing
- **Cost optimization** through efficient resource usage
- **Enhanced security** with localized data processing

## Progressive Web Apps (PWAs) 2.0

### Advanced Capabilities

PWAs are gaining new superpowers:

\`\`\`javascript
// Service Worker with advanced caching strategies
self.addEventListener('fetch', event => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.open('api-cache').then(cache => {
        return fetch(event.request).then(response => {
          // Implement stale-while-revalidate strategy
          cache.put(event.request, response.clone());
          return response;
        }).catch(() => {
          return cache.match(event.request);
        });
      })
    );
  }
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncUserData());
  }
});
\`\`\`

### New Web APIs

- **WebCodecs API** for advanced media processing
- **WebGPU** for high-performance graphics
- **File System Access API** for local file management
- **Web Streams API** for efficient data processing

## Component-Driven Development

### Micro Frontends Architecture

Breaking down monolithic frontends into manageable pieces:

\`\`\`typescript
// Micro frontend module federation configuration
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        'user-management': 'userManagement@http://localhost:3001/remoteEntry.js',
        'analytics': 'analytics@http://localhost:3002/remoteEntry.js'
      }
    })
  ]
};
\`\`\`

### Design System Evolution

Design systems are becoming more sophisticated:

\`\`\`typescript
// Token-based design system
export const tokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      500: '#3b82f6',
      900: '#1e3a8a'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '3rem'
  },
  typography: {
    heading: {
      fontSize: 'clamp(1.5rem, 4vw, 3rem)',
      lineHeight: 1.2
    }
  }
};
\`\`\`

## Web3 and Decentralized Applications

### Blockchain Integration

Web3 technologies are becoming more accessible:

\`\`\`typescript
// Web3 integration example
import { ethers } from 'ethers';

class Web3Service {
  private provider: ethers.providers.Web3Provider;

  async connectWallet(): Promise<string> {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = this.provider.getSigner();
      return await signer.getAddress();
    }
    throw new Error('MetaMask not installed');
  }

  async signMessage(message: string): Promise<string> {
    const signer = this.provider.getSigner();
    return await signer.signMessage(message);
  }
}
\`\`\`

### Decentralized Storage

- **IPFS integration** for distributed file storage
- **Arweave** for permanent data storage
- **Ceramic Network** for decentralized databases

## Advanced CSS and Styling

### CSS Container Queries

Responsive design is evolving beyond viewport-based breakpoints:

\`\`\`css
/* Container queries for component-based responsive design */
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 300px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
}

@container card (min-width: 500px) {
  .card {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
\`\`\`

### CSS-in-JS Evolution

New approaches to styling are emerging:

\`\`\`typescript
// Zero-runtime CSS-in-JS with Linaria
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

const Button = styled.button\`
  background: linear-gradient(135deg, \${props => props.theme.primary}, \${props => props.theme.secondary});
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: white;
  font-weight: 600;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
\`;
\`\`\`

## Performance and User Experience

### Core Web Vitals Evolution

Google's Core Web Vitals continue to evolve:

\`\`\`typescript
// Performance monitoring
class PerformanceMonitor {
  static measureLCP(): Promise<number> {
    return new Promise(resolve => {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    });
  }

  static measureCLS(): Promise<number> {
    return new Promise(resolve => {
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        resolve(clsValue);
      }).observe({ entryTypes: ['layout-shift'] });
    });
  }
}
\`\`\`

### Advanced Loading Strategies

- **Streaming SSR** for faster initial page loads
- **Island architecture** for selective hydration
- **Predictive prefetching** based on user behavior

## Security and Privacy

### Privacy-First Development

\`\`\`typescript
// Privacy-aware analytics
class PrivacyAnalytics {
  private isTrackingAllowed(): boolean {
    return localStorage.getItem('analytics-consent') === 'true';
  }

  trackEvent(event: string, properties?: Record<string, any>): void {
    if (!this.isTrackingAllowed()) return;
    
    // Hash sensitive data before sending
    const hashedProperties = this.hashSensitiveData(properties);
    
    // Send to analytics service
    this.send({
      event,
      properties: hashedProperties,
      timestamp: Date.now()
    });
  }

  private hashSensitiveData(data: any): any {
    // Implementation for hashing sensitive information
    return data;
  }
}
\`\`\`

### Zero-Trust Architecture

- **Content Security Policy (CSP)** enforcement
- **Subresource Integrity (SRI)** for external resources
- **Cross-Origin Embedder Policy (COEP)** for isolation

## Developer Experience Improvements

### Enhanced Debugging Tools

\`\`\`typescript
// Advanced debugging with structured logging
class Logger {
  static info(message: string, context?: Record<string, any>): void {
    if (process.env.NODE_ENV === 'development') {
      console.group(\`📋 \${message}\`);
      if (context) {
        Object.entries(context).forEach(([key, value]) => {
          console.log(\`  \${key}:\`, value);
        });
      }
      console.groupEnd();
    }
  }

  static error(message: string, error?: Error): void {
    console.group(\`❌ \${message}\`);
    if (error) {
      console.error('Stack:', error.stack);
      console.error('Message:', error.message);
    }
    console.groupEnd();
  }
}
\`\`\`

### Hot Module Replacement Evolution

- **React Fast Refresh** improvements
- **Vite's** lightning-fast HMR
- **Webpack 5** Module Federation

## Accessibility and Inclusion

### Automated Accessibility Testing

\`\`\`typescript
// Accessibility testing integration
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  test('should not have accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
\`\`\`

### Inclusive Design Patterns

- **Reduced motion** preferences
- **High contrast** mode support
- **Screen reader** optimizations
- **Voice navigation** interfaces

## Predictions for 2025

### Technology Adoption

1. **WebAssembly** will power 30% of performance-critical web applications
2. **Edge computing** will become the default for new applications
3. **AI-assisted development** will be integrated into most IDEs
4. **Web3 technologies** will see mainstream adoption in enterprise applications
5. **Progressive Web Apps** will challenge native mobile apps

### Industry Shifts

- **Micro-frontends** will become the standard for large applications
- **Serverless-first** architecture will dominate new projects
- **Privacy-by-design** will become a legal requirement in most regions
- **Real-time collaboration** features will be expected in all applications

## Preparing for the Future

### Skills to Develop

1. **AI/ML fundamentals** for better tool utilization
2. **WebAssembly** and systems programming languages
3. **Edge computing** and distributed systems
4. **Web3 technologies** and blockchain development
5. **Performance optimization** and Core Web Vitals

### Tools to Master

- **Next.js** and **Nuxt.js** for full-stack development
- **Vite** and **Turbopack** for build tooling
- **Playwright** and **Cypress** for testing
- **Figma** and **Linear** for design and project management

## Conclusion

The future of web development is exciting and full of opportunities. As we move through 2025, developers who embrace these emerging technologies and trends will be well-positioned to create innovative, performant, and user-friendly web applications.

The key to success will be continuous learning and adaptation. While the fundamentals of good software engineering remain constant, the tools and techniques we use to implement them are rapidly evolving.

Stay curious, keep experimenting, and remember that the best way to predict the future is to build it.

## Resources for Further Learning

- [MDN Web Docs](https://developer.mozilla.org/) - Comprehensive web development documentation
- [Web.dev](https://web.dev/) - Modern web development best practices
- [Can I Use](https://caniuse.com/) - Browser compatibility data
- [WebAssembly.org](https://webassembly.org/) - WebAssembly resources and tutorials
- [Progressive Web App Checklist](https://web.dev/pwa-checklist/) - PWA development guide
`,
    author: "Jireh Custodio",
    authorBio: "Computer Engineering graduate and Full-Stack Developer specializing in cloud computing, cybersecurity, and modern web technologies. Currently working as IT Support Engineer at LGU Naga City.",
    authorImage: "/authors/jireh-custodio.jpg", 
    date: "2025-01-10",
    readTime: "15 min read",
    category: "Technology",
    tags: ["Web Development", "Future Tech", "AI", "WebAssembly", "Edge Computing"],
    image: "/blog/web-future-hero.jpg",
    featured: false,
    likes: 89,
    views: 1923,
    publishedAt: "2025-01-10T14:30:00Z",
    updatedAt: "2025-01-10T14:30:00Z"
  },
  {
    id: 3,
    title: "Cloud Security Best Practices for Modern Applications",
    excerpt: "Essential security considerations and implementation strategies for cloud-based applications and infrastructure.",
    content: `
# Cloud Security Best Practices for Modern Applications

As organizations increasingly migrate their applications and infrastructure to the cloud, security becomes more critical than ever. Cloud security requires a comprehensive approach that addresses the unique challenges and opportunities presented by cloud computing environments.

## Introduction

Cloud computing has revolutionized how we deploy, scale, and manage applications. However, this shift has also introduced new security considerations that require specialized knowledge and practices. Understanding the shared responsibility model, implementing proper access controls, and maintaining security throughout the development lifecycle are essential for protecting cloud-based applications.

## Understanding the Shared Responsibility Model

### Cloud Provider Responsibilities

Cloud providers are responsible for:
- Physical security of data centers
- Hardware and infrastructure security
- Hypervisor and virtualization layer security
- Network infrastructure protection
- Service availability and reliability

### Customer Responsibilities

As a customer, you are responsible for:
- Identity and access management
- Application-level security
- Data encryption and protection
- Network traffic protection
- Operating system updates and patches
- Configuration management

\`\`\`typescript
// Example: Secure configuration for AWS S3 bucket
const s3BucketPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "DenyInsecureConnections",
      Effect: "Deny",
      Principal: "*",
      Action: "s3:*",
      Resource: [
        "arn:aws:s3:::my-secure-bucket/*",
        "arn:aws:s3:::my-secure-bucket"
      ],
      Condition: {
        Bool: {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
};
\`\`\`

## Identity and Access Management (IAM)

### Principle of Least Privilege

Always grant the minimum permissions necessary for users and applications to perform their tasks:

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::my-app-bucket/user-uploads/*",
      "Condition": {
        "StringEquals": {
          "s3:x-amz-server-side-encryption": "AES256"
        }
      }
    }
  ]
}
\`\`\`

### Multi-Factor Authentication (MFA)

Implement MFA for all privileged accounts:

\`\`\`typescript
// Example MFA implementation
class MFAService {
  async generateTOTP(secret: string): Promise<string> {
    const epoch = Math.round(new Date().getTime() / 1000.0);
    const time = Math.floor(epoch / 30);
    return this.generateHOTP(secret, time);
  }

  async verifyMFA(userToken: string, secret: string): Promise<boolean> {
    const serverToken = await this.generateTOTP(secret);
    return this.constantTimeComparison(userToken, serverToken);
  }

  private constantTimeComparison(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
  }
}
\`\`\`

### Role-Based Access Control (RBAC)

Implement comprehensive RBAC systems:

\`\`\`typescript
interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

interface Permission {
  resource: string;
  actions: string[];
  conditions?: Record<string, any>;
}

class RBACService {
  async checkPermission(
    userId: string, 
    resource: string, 
    action: string,
    context?: Record<string, any>
  ): Promise<boolean> {
    const userRoles = await this.getUserRoles(userId);
    
    for (const role of userRoles) {
      for (const permission of role.permissions) {
        if (this.matchesResource(permission.resource, resource) && 
            permission.actions.includes(action)) {
          
          if (permission.conditions) {
            return this.evaluateConditions(permission.conditions, context);
          }
          return true;
        }
      }
    }
    return false;
  }

  private matchesResource(pattern: string, resource: string): boolean {
    // Implement resource pattern matching
    const regex = new RegExp(pattern.replace('*', '.*'));
    return regex.test(resource);
  }

  private evaluateConditions(
    conditions: Record<string, any>, 
    context?: Record<string, any>
  ): boolean {
    // Implement condition evaluation logic
    return true; // Simplified for example
  }
}
\`\`\`

## Data Protection and Encryption

### Encryption at Rest

Ensure all sensitive data is encrypted when stored:

\`\`\`typescript
import * as crypto from 'crypto';

class EncryptionService {
  private algorithm = 'aes-256-gcm';
  
  encrypt(text: string, key: Buffer): EncryptedData {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.algorithm, key);
    cipher.setAAD(Buffer.from('additional-auth-data'));
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  }

  decrypt(encryptedData: EncryptedData, key: Buffer): string {
    const decipher = crypto.createDecipher(this.algorithm, key);
    decipher.setAAD(Buffer.from('additional-auth-data'));
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
\`\`\`

### Encryption in Transit

Always use HTTPS/TLS for data transmission:

\`\`\`typescript
// Express.js with security headers
import express from 'express';
import helmet from 'helmet';
import https from 'https';
import fs from 'fs';

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// SSL/TLS configuration
const options = {
  key: fs.readFileSync('path/to/private-key.pem'),
  cert: fs.readFileSync('path/to/certificate.pem'),
  // Enable only strong ciphers
  ciphers: 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384',
  honorCipherOrder: true,
  secureProtocol: 'TLSv1_2_method'
};

https.createServer(options, app).listen(443);
\`\`\`

## Network Security

### Virtual Private Clouds (VPCs)

Design secure network architectures:

\`\`\`yaml
# Example Terraform configuration for secure VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "secure-vpc"
  }
}

resource "aws_subnet" "private" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.\${count.index + 1}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "private-subnet-\${count.index + 1}"
  }
}

resource "aws_security_group" "app_sg" {
  name        = "app-security-group"
  description = "Security group for application tier"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.main.cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
\`\`\`

### Web Application Firewalls (WAF)

Implement WAF rules to protect against common attacks:

\`\`\`typescript
// CloudFlare Workers WAF example
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    // Block common attack patterns
    if (this.isBlocked(request)) {
      return new Response('Blocked', { status: 403 });
    }
    
    // Rate limiting
    if (await this.isRateLimited(request)) {
      return new Response('Rate Limited', { status: 429 });
    }
    
    // Continue to origin
    return fetch(request);
  },

  isBlocked(request: Request): boolean {
    const userAgent = request.headers.get('User-Agent') || '';
    const url = request.url;
    
    // Block SQL injection attempts
    if (url.match(/union\s+select/i) || url.match(/drop\s+table/i)) {
      return true;
    }
    
    // Block XSS attempts
    if (url.match(/<script/i) || url.match(/javascript:/i)) {
      return true;
    }
    
    // Block malicious user agents
    if (userAgent.match(/sqlmap|nmap|nikto/i)) {
      return true;
    }
    
    return false;
  },

  async isRateLimited(request: Request): Promise<boolean> {
    const ip = request.headers.get('CF-Connecting-IP');
    if (!ip) return false;
    
    const key = \`rate_limit:\${ip}\`;
    const current = await KV.get(key);
    const count = current ? parseInt(current) : 0;
    
    if (count > 100) { // 100 requests per minute
      return true;
    }
    
    await KV.put(key, (count + 1).toString(), { expirationTtl: 60 });
    return false;
  }
};
\`\`\`

## Container Security

### Secure Container Images

\`\`\`dockerfile
# Multi-stage build for minimal attack surface
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS runtime
# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodeuser -u 1001
WORKDIR /app

# Copy only necessary files
COPY --from=builder --chown=nodeuser:nodejs /app/node_modules ./node_modules
COPY --chown=nodeuser:nodejs . .

# Remove unnecessary packages
RUN apk del --purge && rm -rf /var/cache/apk/*

# Switch to non-root user
USER nodeuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

### Kubernetes Security

\`\`\`yaml
# Secure Pod Security Policy
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted-psp
spec:
  privileged: false
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  volumes:
    - 'configMap'
    - 'emptyDir'
    - 'projected'
    - 'secret'
    - 'downwardAPI'
    - 'persistentVolumeClaim'
  runAsUser:
    rule: 'MustRunAsNonRoot'
  seLinux:
    rule: 'RunAsAny'
  fsGroup:
    rule: 'RunAsAny'
  readOnlyRootFilesystem: true
\`\`\`

## Monitoring and Incident Response

### Security Monitoring

\`\`\`typescript
class SecurityMonitor {
  private alertThresholds = {
    failedLogins: 5,
    unusualDataAccess: 10,
    privilegedActions: 3
  };

  async monitorSecurityEvents(): Promise<void> {
    const events = await this.getSecurityEvents();
    
    for (const event of events) {
      await this.processSecurityEvent(event);
    }
  }

  private async processSecurityEvent(event: SecurityEvent): Promise<void> {
    switch (event.type) {
      case 'FAILED_LOGIN':
        await this.handleFailedLogin(event);
        break;
      case 'DATA_ACCESS':
        await this.handleDataAccess(event);
        break;
      case 'PRIVILEGED_ACTION':
        await this.handlePrivilegedAction(event);
        break;
    }
  }

  private async handleFailedLogin(event: SecurityEvent): Promise<void> {
    const recentFailures = await this.getRecentFailedLogins(event.userId);
    
    if (recentFailures.length >= this.alertThresholds.failedLogins) {
      await this.triggerAlert({
        type: 'BRUTE_FORCE_ATTEMPT',
        severity: 'HIGH',
        userId: event.userId,
        details: \`\${recentFailures.length} failed login attempts\`
      });
      
      // Implement account lockout
      await this.lockAccount(event.userId, 15 * 60 * 1000); // 15 minutes
    }
  }

  private async triggerAlert(alert: SecurityAlert): Promise<void> {
    // Send to security team
    await this.notifySecurityTeam(alert);
    
    // Log to security information and event management (SIEM)
    await this.logToSIEM(alert);
    
    // Trigger automated response if necessary
    if (alert.severity === 'CRITICAL') {
      await this.triggerAutomatedResponse(alert);
    }
  }
}
\`\`\`

### Incident Response Plan

\`\`\`typescript
class IncidentResponse {
  private incidentSeverities = {
    LOW: { responseTime: 24 * 60 * 60 * 1000, escalation: 48 * 60 * 60 * 1000 },
    MEDIUM: { responseTime: 4 * 60 * 60 * 1000, escalation: 8 * 60 * 60 * 1000 },
    HIGH: { responseTime: 1 * 60 * 60 * 1000, escalation: 2 * 60 * 60 * 1000 },
    CRITICAL: { responseTime: 15 * 60 * 1000, escalation: 30 * 60 * 1000 }
  };

  async handleIncident(incident: SecurityIncident): Promise<void> {
    // Step 1: Immediate containment
    await this.containIncident(incident);
    
    // Step 2: Assessment and investigation
    const assessment = await this.assessIncident(incident);
    
    // Step 3: Eradication
    await this.eradicateThreats(assessment);
    
    // Step 4: Recovery
    await this.recoverSystems(assessment);
    
    // Step 5: Post-incident analysis
    await this.conductPostIncidentAnalysis(incident, assessment);
  }

  private async containIncident(incident: SecurityIncident): Promise<void> {
    switch (incident.type) {
      case 'DATA_BREACH':
        await this.isolateAffectedSystems(incident.affectedSystems);
        await this.revokeCompromisedCredentials(incident.compromisedAccounts);
        break;
      case 'MALWARE_DETECTED':
        await this.quarantineInfectedSystems(incident.affectedSystems);
        break;
      case 'DDOS_ATTACK':
        await this.activateDDoSProtection();
        break;
    }
  }
}
\`\`\`

## Compliance and Governance

### Compliance Frameworks

Common compliance requirements:

- **SOC 2**: Service Organization Control 2
- **PCI DSS**: Payment Card Industry Data Security Standard
- **HIPAA**: Health Insurance Portability and Accountability Act
- **GDPR**: General Data Protection Regulation
- **ISO 27001**: Information Security Management System

\`\`\`typescript
// Example compliance check implementation
class ComplianceChecker {
  async checkSOC2Compliance(): Promise<ComplianceReport> {
    const checks = [
      await this.checkAccessControls(),
      await this.checkDataEncryption(),
      await this.checkAuditLogging(),
      await this.checkBackupProcedures(),
      await this.checkIncidentResponse()
    ];

    return {
      framework: 'SOC2',
      overallScore: this.calculateScore(checks),
      checks,
      recommendations: this.generateRecommendations(checks),
      lastChecked: new Date()
    };
  }

  private async checkAccessControls(): Promise<ComplianceCheck> {
    // Verify MFA is enabled for all privileged accounts
    const privilegedUsers = await this.getPrivilegedUsers();
    const mfaEnabled = privilegedUsers.filter(user => user.mfaEnabled);
    
    return {
      name: 'Access Controls',
      status: mfaEnabled.length === privilegedUsers.length ? 'PASS' : 'FAIL',
      details: \`MFA enabled for \${mfaEnabled.length}/\${privilegedUsers.length} privileged users\`,
      remediation: mfaEnabled.length !== privilegedUsers.length 
        ? 'Enable MFA for all privileged accounts' 
        : null
    };
  }
}
\`\`\`

## Security Testing and Validation

### Automated Security Testing

\`\`\`typescript
// Security testing pipeline
class SecurityTestSuite {
  async runSecurityTests(): Promise<SecurityTestResults> {
    const results = await Promise.all([
      this.runStaticAnalysis(),
      this.runDependencyCheck(),
      this.runContainerScan(),
      this.runDynamicTesting(),
      this.runPenetrationTest()
    ]);

    return {
      timestamp: new Date(),
      results,
      overallStatus: this.determineOverallStatus(results),
      recommendations: this.generateSecurityRecommendations(results)
    };
  }

  private async runStaticAnalysis(): Promise<TestResult> {
    // Run SAST (Static Application Security Testing)
    const findings = await this.executeSAST();
    
    return {
      testType: 'Static Analysis',
      status: findings.critical.length === 0 ? 'PASS' : 'FAIL',
      findings,
      recommendations: this.generateSASTRecommendations(findings)
    };
  }

  private async runDependencyCheck(): Promise<TestResult> {
    // Check for vulnerable dependencies
    const vulnerabilities = await this.scanDependencies();
    
    return {
      testType: 'Dependency Vulnerability Scan',
      status: vulnerabilities.filter(v => v.severity === 'CRITICAL').length === 0 ? 'PASS' : 'FAIL',
      findings: vulnerabilities,
      recommendations: ['Update vulnerable dependencies', 'Implement dependency monitoring']
    };
  }
}
\`\`\`

## Best Practices Summary

### Security Checklist

**Identity & Access Management:**
- [ ] Implement least privilege access
- [ ] Enable MFA for all accounts
- [ ] Regular access reviews
- [ ] Strong password policies

**Data Protection:**
- [ ] Encrypt data at rest and in transit
- [ ] Implement data classification
- [ ] Regular data backups
- [ ] Secure data deletion

**Network Security:**
- [ ] Use VPCs and security groups
- [ ] Implement WAF rules
- [ ] Regular network monitoring
- [ ] Secure API gateways

**Application Security:**
- [ ] Input validation and sanitization
- [ ] Output encoding
- [ ] Secure coding practices
- [ ] Regular security testing

**Monitoring & Response:**
- [ ] Continuous security monitoring
- [ ] Incident response plan
- [ ] Regular security assessments
- [ ] Security awareness training

## Conclusion

Cloud security is an ongoing process that requires continuous attention and improvement. By implementing these best practices, organizations can significantly reduce their security risk while taking advantage of the benefits that cloud computing offers.

Remember that security is not a one-time implementation but a continuous process of assessment, improvement, and adaptation to new threats and technologies. Stay informed about the latest security trends, regularly update your security practices, and maintain a culture of security awareness throughout your organization.

The investment in proper cloud security practices pays dividends in protecting your organization's data, maintaining customer trust, and ensuring business continuity in an increasingly digital world.

## Additional Resources

- [OWASP Cloud Security](https://owasp.org/www-project-cloud-security/) - Open Web Application Security Project cloud security resources
- [Cloud Security Alliance](https://cloudsecurityalliance.org/) - Industry best practices and research
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework) - Comprehensive cybersecurity guidance
- [CIS Controls](https://www.cisecurity.org/controls/) - Prioritized cybersecurity best practices
`,
    author: "Jireh Custodio",
    authorBio: "Computer Engineering graduate and Full-Stack Developer specializing in cloud computing, cybersecurity, and modern web technologies. Currently working as IT Support Engineer at LGU Naga City.",
    authorImage: "/authors/jireh-custodio.jpg",
    date: "2025-01-05",
    readTime: "18 min read",
    category: "Security",
    tags: ["Cloud Security", "Cybersecurity", "Best Practices", "Infrastructure", "Compliance"],
    image: "/blog/cloud-security-hero.jpg",
    featured: true,
    likes: 156,
    views: 3421,
    publishedAt: "2025-01-05T09:15:00Z",
    updatedAt: "2025-01-05T09:15:00Z"
  },
  {
    id: 4,
    title: "Optimizing Performance in Next.js Applications",
    excerpt: "Advanced techniques for improving load times, SEO, and user experience in Next.js applications.",
    content: `
# Optimizing Performance in Next.js Applications

Performance optimization is critical for modern web applications, affecting everything from user experience to search engine rankings. Next.js provides powerful built-in optimizations, but understanding how to leverage them effectively is key to building lightning-fast applications.

## Introduction

In today's competitive digital landscape, website performance directly impacts user engagement, conversion rates, and SEO rankings. Studies show that a 1-second delay in page load time can result in a 7% reduction in conversions. Next.js, with its focus on performance, provides numerous optimization strategies out of the box.

## Core Web Vitals and Next.js

### Understanding Core Web Vitals

Google's Core Web Vitals consist of three key metrics:

**1. Largest Contentful Paint (LCP)**
- Measures loading performance
- Should occur within 2.5 seconds of when the page first starts loading

**2. First Input Delay (FID)**
- Measures interactivity
- Should be less than 100 milliseconds

**3. Cumulative Layout Shift (CLS)**
- Measures visual stability
- Should maintain a score of less than 0.1

### Implementing Performance Monitoring

\`\`\`typescript
// lib/performance.ts
export function measureWebVitals(metric: any) {
  switch (metric.name) {
    case 'FCP':
      console.log('First Contentful Paint:', metric.value);
      break;
    case 'LCP':
      console.log('Largest Contentful Paint:', metric.value);
      break;
    case 'CLS':
      console.log('Cumulative Layout Shift:', metric.value);
      break;
    case 'FID':
      console.log('First Input Delay:', metric.value);
      break;
    case 'TTFB':
      console.log('Time to First Byte:', metric.value);
      break;
  }
  
  // Send to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      custom_map: { metric_id: 'web_vitals' },
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }
}
\`\`\`

## Image Optimization Strategies

### Next.js Image Component

The Next.js Image component provides automatic optimization:

\`\`\`typescript
import Image from 'next/image';

// Optimized image component
export function OptimizedImage({ src, alt, priority = false }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      priority={priority}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli5GvuH467raEs7d0Tgs3I2vFfUWiRCMjUIjuxwwwKpyGuNe+q+gQYhG1bj6yK2jkaTXPHmGD6+"
      className="rounded-lg shadow-md"
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}
\`\`\`

### Advanced Image Optimization

\`\`\`typescript
// next.config.js
module.exports = {
  images: {
    domains: ['example.com', 'cdn.example.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable compression
  compress: true,
  // Optimize bundle
  swcMinify: true,
};
\`\`\`

## Code Splitting and Dynamic Imports

### Component-Level Code Splitting

\`\`\`typescript
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load heavy components
const HeavyChart = dynamic(() => import('../components/HeavyChart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false, // Disable SSR for client-only components
});

const HeavyModal = dynamic(() => import('../components/HeavyModal'), {
  suspense: true,
});

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Load chart only when needed */}
      <HeavyChart />
      
      {/* Suspense boundary for better loading experience */}
      <Suspense fallback={<div>Loading modal...</div>}>
        <HeavyModal />
      </Suspense>
    </div>
  );
}
\`\`\`

### Route-Based Code Splitting

\`\`\`typescript
// Automatic route-based splitting
// pages/admin/index.tsx - Only loads when accessing /admin
import { GetServerSideProps } from 'next';

export default function AdminDashboard({ data }) {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Heavy admin components */}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Pre-load critical data
  const data = await fetchAdminData();
  
  return {
    props: { data },
  };
};
\`\`\`

## Caching Strategies

### Static Generation with ISR

\`\`\`typescript
// Incremental Static Regeneration
export async function getStaticProps() {
  const posts = await fetchPosts();
  
  return {
    props: { posts },
    revalidate: 3600, // Regenerate every hour
  };
}

export async function getStaticPaths() {
  const paths = await getAllPostPaths();
  
  return {
    paths,
    fallback: 'blocking', // Generate missing pages on demand
  };
}
\`\`\`

### API Route Caching

\`\`\`typescript
// pages/api/posts/[id].ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  const post = await fetchPost(id);
  
  return NextResponse.json(post, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
\`\`\`

## Bundle Optimization

### Analyzing Bundle Size

\`\`\`bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Analyze bundle
ANALYZE=true npm run build
\`\`\`

\`\`\`javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Your Next.js config
});
\`\`\`

### Tree Shaking and Dead Code Elimination

\`\`\`typescript
// Import only what you need
import { debounce } from 'lodash/debounce'; // ✅ Good
import _ from 'lodash'; // ❌ Imports entire library

// Use dynamic imports for large libraries
async function loadChart() {
  const { Chart } = await import('chart.js');
  return Chart;
}
\`\`\`

## Performance Monitoring in Production

### Real User Monitoring

\`\`\`typescript
// lib/analytics.ts
export function initPerformanceMonitoring() {
  if (typeof window !== 'undefined') {
    // Monitor Core Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
    });
  }
}

function sendToAnalytics({ name, value, id }) {
  // Send to your analytics service
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({
        metric: name,
        value: value,
        id: id,
        timestamp: Date.now(),
      }),
    });
  }
}
\`\`\`

### Performance Budget

\`\`\`javascript
// lighthouse.config.js
module.exports = {
  ci: {
    collect: {
      staticDistDir: './out',
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
  },
};
\`\`\`

## Advanced Optimization Techniques

### Service Workers for Caching

\`\`\`typescript
// public/sw.js
const CACHE_NAME = 'app-cache-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
\`\`\`

### Edge Computing with Vercel Edge Functions

\`\`\`typescript
// pages/api/edge/personalization.ts
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(request: NextRequest) {
  const country = request.geo?.country || 'US';
  const city = request.geo?.city || 'Unknown';
  
  return NextResponse.json({
    message: \`Hello from \${city}, \${country}!\`,
    timestamp: new Date().toISOString(),
  });
}
\`\`\`

## Conclusion

Performance optimization in Next.js is an ongoing process that requires attention to multiple areas: from image optimization and code splitting to caching strategies and real-time monitoring. The key is to:

1. **Measure first** - Use tools like Lighthouse and Core Web Vitals
2. **Optimize systematically** - Focus on the biggest impact areas
3. **Monitor continuously** - Track performance in production
4. **Stay updated** - Keep up with Next.js performance improvements

By implementing these strategies, you can create Next.js applications that deliver exceptional user experiences while maintaining excellent search engine rankings and conversion rates.

## Additional Resources

- [Next.js Performance Documentation](https://nextjs.org/docs/basic-features/performance)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Bundle Analyzer Documentation](https://www.npmjs.com/package/@next/bundle-analyzer)
`,
    author: "Jireh Custodio",
    authorBio: "Computer Engineering graduate and Full-Stack Developer specializing in cloud computing, cybersecurity, and modern web technologies. Currently working as IT Support Engineer at LGU Naga City.",
    authorImage: "/authors/jireh-custodio.jpg",
    date: "2024-12-28",
    readTime: "12 min read",
    category: "Performance",
    tags: ["Next.js", "Performance", "Optimization", "Web Vitals", "Caching"],
    image: "/blog/nextjs-performance-hero.jpg",
    featured: false,
    likes: 94,
    views: 2156,
    publishedAt: "2024-12-28T10:00:00Z",
    updatedAt: "2024-12-28T10:00:00Z"
  },
  {
    id: 5,
    title: "Database Design Patterns for Scalable Applications",
    excerpt: "Comprehensive guide to database design patterns, normalization strategies, and performance optimization techniques.",
    content: `
# Database Design Patterns for Scalable Applications

Effective database design is the foundation of any scalable application. Poor database architecture can become a bottleneck that limits your application's growth and performance. This comprehensive guide explores proven patterns and strategies for designing databases that scale.

## Introduction

As applications grow from handling hundreds to millions of users, the database often becomes the first bottleneck. Understanding database design patterns, normalization strategies, and optimization techniques is crucial for building systems that can handle increasing load while maintaining performance and data integrity.

## Fundamental Design Principles

### ACID Properties

Understanding ACID properties is essential for reliable database design:

**Atomicity**: Each transaction is all-or-nothing
**Consistency**: Database remains in a valid state
**Isolation**: Concurrent transactions don't interfere
**Durability**: Committed changes are permanent

\`\`\`sql
-- Example of an atomic transaction
BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
  INSERT INTO transactions (from_account, to_account, amount) 
  VALUES (1, 2, 100);
COMMIT;
\`\`\`

### Normalization vs. Denormalization

#### Third Normal Form (3NF)

\`\`\`sql
-- Normalized design (3NF)
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  order_date TIMESTAMP DEFAULT NOW(),
  total_amount DECIMAL(10,2)
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2)
);
\`\`\`

#### Strategic Denormalization

\`\`\`sql
-- Denormalized for read performance
CREATE TABLE order_summary (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER,
  customer_name VARCHAR(100),
  customer_email VARCHAR(100),
  order_date TIMESTAMP,
  total_amount DECIMAL(10,2),
  item_count INTEGER,
  -- Denormalized fields for faster queries
  last_order_date TIMESTAMP,
  total_lifetime_value DECIMAL(12,2)
);
\`\`\`

## Advanced Design Patterns

### Repository Pattern

\`\`\`typescript
// TypeScript implementation
interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: CreateUserInput): Promise<User>;
  update(id: string, data: UpdateUserInput): Promise<User>;
  delete(id: string): Promise<void>;
}

class PostgresUserRepository implements UserRepository {
  constructor(private db: Database) {}

  async findById(id: string): Promise<User | null> {
    const result = await this.db.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async create(user: CreateUserInput): Promise<User> {
    const result = await this.db.query(
      \`INSERT INTO users (name, email, password_hash) 
       VALUES ($1, $2, $3) 
       RETURNING *\`,
      [user.name, user.email, user.passwordHash]
    );
    return result.rows[0];
  }
}
\`\`\`

### Unit of Work Pattern

\`\`\`typescript
class UnitOfWork {
  private newEntities: Set<Entity> = new Set();
  private dirtyEntities: Set<Entity> = new Set();
  private removedEntities: Set<Entity> = new Set();

  registerNew(entity: Entity): void {
    this.newEntities.add(entity);
  }

  registerDirty(entity: Entity): void {
    this.dirtyEntities.add(entity);
  }

  registerRemoved(entity: Entity): void {
    this.removedEntities.add(entity);
  }

  async commit(): Promise<void> {
    const transaction = await this.db.beginTransaction();
    
    try {
      // Insert new entities
      for (const entity of this.newEntities) {
        await this.insertEntity(entity, transaction);
      }
      
      // Update dirty entities
      for (const entity of this.dirtyEntities) {
        await this.updateEntity(entity, transaction);
      }
      
      // Remove entities
      for (const entity of this.removedEntities) {
        await this.deleteEntity(entity, transaction);
      }
      
      await transaction.commit();
      this.clearChanges();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
\`\`\`

## Scaling Patterns

### Read Replicas

\`\`\`typescript
class DatabaseManager {
  constructor(
    private masterDb: Database,
    private readReplicas: Database[]
  ) {}

  async executeWrite(query: string, params: any[]): Promise<any> {
    return this.masterDb.query(query, params);
  }

  async executeRead(query: string, params: any[]): Promise<any> {
    // Load balance across read replicas
    const replica = this.getRandomReplica();
    return replica.query(query, params);
  }

  private getRandomReplica(): Database {
    const index = Math.floor(Math.random() * this.readReplicas.length);
    return this.readReplicas[index];
  }
}
\`\`\`

### Database Sharding

\`\`\`typescript
interface ShardStrategy {
  getShard(key: string): string;
}

class HashShardStrategy implements ShardStrategy {
  constructor(private shardCount: number) {}

  getShard(key: string): string {
    const hash = this.hashFunction(key);
    const shardIndex = hash % this.shardCount;
    return \`shard_\${shardIndex}\`;
  }

  private hashFunction(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}

class ShardedDatabase {
  constructor(
    private shards: Map<string, Database>,
    private strategy: ShardStrategy
  ) {}

  async query(shardKey: string, sql: string, params: any[]): Promise<any> {
    const shardName = this.strategy.getShard(shardKey);
    const shard = this.shards.get(shardName);
    
    if (!shard) {
      throw new Error(\`Shard \${shardName} not found\`);
    }
    
    return shard.query(sql, params);
  }
}
\`\`\`

### CQRS (Command Query Responsibility Segregation)

\`\`\`typescript
// Command side - optimized for writes
class UserCommandHandler {
  constructor(private writeDb: Database) {}

  async createUser(command: CreateUserCommand): Promise<void> {
    await this.writeDb.query(
      'INSERT INTO users (id, name, email) VALUES ($1, $2, $3)',
      [command.id, command.name, command.email]
    );
    
    // Publish event for read model update
    await this.eventBus.publish(new UserCreatedEvent(command));
  }
}

// Query side - optimized for reads
class UserQueryHandler {
  constructor(private readDb: Database) {}

  async getUserProfile(userId: string): Promise<UserProfile> {
    return this.readDb.query(
      \`SELECT u.*, p.bio, p.avatar_url, 
              COUNT(o.id) as order_count,
              SUM(o.total) as lifetime_value
       FROM user_profiles u
       LEFT JOIN profiles p ON u.id = p.user_id
       LEFT JOIN orders o ON u.id = o.user_id
       WHERE u.id = $1
       GROUP BY u.id, p.bio, p.avatar_url\`,
      [userId]
    );
  }
}
\`\`\`

## Performance Optimization

### Indexing Strategies

\`\`\`sql
-- Composite index for common query patterns
CREATE INDEX idx_orders_customer_date 
ON orders (customer_id, order_date DESC);

-- Partial index for active records only
CREATE INDEX idx_active_users 
ON users (email) 
WHERE active = true;

-- Functional index for case-insensitive searches
CREATE INDEX idx_users_email_lower 
ON users (LOWER(email));

-- Covering index to avoid table lookups
CREATE INDEX idx_orders_covering 
ON orders (customer_id) 
INCLUDE (order_date, total_amount);
\`\`\`

### Query Optimization

\`\`\`sql
-- Efficient pagination with cursor-based approach
SELECT * FROM posts 
WHERE created_at < $1 
ORDER BY created_at DESC 
LIMIT 20;

-- Avoid N+1 queries with JOINs
SELECT p.*, c.name as category_name
FROM posts p
JOIN categories c ON p.category_id = c.id
WHERE p.published = true;

-- Use EXISTS instead of IN for large datasets
SELECT * FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o 
  WHERE o.user_id = u.id 
  AND o.created_at > NOW() - INTERVAL '30 days'
);
\`\`\`

### Connection Pooling

\`\`\`typescript
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
  max: 20, // Maximum number of connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

class DatabaseService {
  async query(text: string, params?: any[]): Promise<any> {
    const client = await pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  }
}
\`\`\`

## Monitoring and Maintenance

### Query Performance Monitoring

\`\`\`sql
-- PostgreSQL: Enable query logging
SET log_min_duration_statement = 1000; -- Log queries > 1 second

-- Find slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Index usage statistics
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;
\`\`\`

### Automated Health Checks

\`\`\`typescript
class DatabaseHealthChecker {
  async checkHealth(): Promise<HealthStatus> {
    const checks = await Promise.allSettled([
      this.checkConnection(),
      this.checkReplicationLag(),
      this.checkDiskSpace(),
      this.checkSlowQueries(),
    ]);

    return {
      healthy: checks.every(check => check.status === 'fulfilled'),
      checks: checks.map((check, index) => ({
        name: ['connection', 'replication', 'disk', 'queries'][index],
        status: check.status,
        details: check.status === 'fulfilled' ? check.value : check.reason,
      })),
    };
  }

  private async checkReplicationLag(): Promise<number> {
    const result = await this.db.query(
      'SELECT EXTRACT(EPOCH FROM (now() - pg_last_xact_replay_timestamp()))::int as lag'
    );
    return result.rows[0].lag;
  }
}
\`\`\`

## Best Practices Summary

### Data Modeling
- **Start with normalized design** and denormalize strategically
- **Use appropriate data types** to save space and improve performance
- **Implement proper constraints** to maintain data integrity
- **Design for your query patterns**, not just data relationships

### Performance
- **Index wisely** - balance query performance with write overhead
- **Monitor query performance** and optimize bottlenecks
- **Use connection pooling** to manage database connections efficiently
- **Implement caching** at multiple levels (query, application, CDN)

### Scalability
- **Plan for growth** from the beginning
- **Use read replicas** to scale read operations
- **Consider sharding** for massive scale requirements
- **Implement CQRS** for complex read/write patterns

### Security
- **Use parameterized queries** to prevent SQL injection
- **Implement proper authentication and authorization**
- **Encrypt sensitive data** both at rest and in transit
- **Regular security audits** and updates

## Conclusion

Database design for scalable applications requires careful planning, understanding of access patterns, and continuous optimization. The patterns and techniques covered in this guide provide a solid foundation for building databases that can grow with your application.

Remember that scalability is not just about handling more data—it's about maintaining performance, ensuring reliability, and keeping complexity manageable as your system grows.

## Additional Resources

- [PostgreSQL Performance Tuning](https://wiki.postgresql.org/wiki/Performance_Optimization)
- [MySQL High Availability](https://dev.mysql.com/doc/mysql-ha-scalability/en/)
- [Database Design Patterns](https://martinfowler.com/articles/patterns-of-distributed-systems/)
- [CQRS Pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [Sharding Patterns](https://docs.microsoft.com/en-us/azure/architecture/patterns/sharding)
`,
    author: "Jireh Custodio",
    authorBio: "Computer Engineering graduate and Full-Stack Developer specializing in cloud computing, cybersecurity, and modern web technologies. Currently working as IT Support Engineer at LGU Naga City.",
    authorImage: "/authors/jireh-custodio.jpg",
    date: "2024-12-20",
    readTime: "15 min read",
    category: "Database",
    tags: ["Database", "Design Patterns", "SQL", "Performance", "Scalability"],
    image: "/blog/database-design-hero.jpg",
    featured: false,
    likes: 112,
    views: 2834,
    publishedAt: "2024-12-20T09:00:00Z",
    updatedAt: "2024-12-20T09:00:00Z"
  },
  {
    id: 6,
    title: "Building Real-time Applications with WebSockets",
    excerpt: "Step-by-step guide to implementing real-time features using WebSockets, including chat systems and live updates.",
    content: `
# Building Real-time Applications with WebSockets

Real-time applications have become essential in modern web development, enabling instant communication, live updates, and collaborative experiences. WebSockets provide the foundation for building these interactive applications by maintaining persistent, bidirectional communication between clients and servers.

## Introduction

Traditional HTTP request-response cycles are insufficient for real-time applications that require instant updates. WebSockets solve this by establishing a persistent connection that allows both client and server to send data at any time, making them perfect for chat applications, live notifications, collaborative editing, and real-time dashboards.

## WebSocket Fundamentals

### Understanding the WebSocket Protocol

WebSockets start with an HTTP handshake that upgrades the connection:

\`\`\`javascript
// Client-side WebSocket connection
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function(event) {
  console.log('Connected to WebSocket server');
};

socket.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

socket.onclose = function(event) {
  console.log('WebSocket connection closed');
};

socket.onerror = function(error) {
  console.error('WebSocket error:', error);
};
\`\`\`

### Server-Side Implementation with Node.js

\`\`\`javascript
// Using ws library
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws, request) {
  console.log('New client connected');
  
  ws.on('message', function incoming(message) {
    console.log('Received:', message);
    
    // Broadcast to all connected clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  
  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});
\`\`\`

## Building a Real-time Chat Application

### Frontend Implementation with React

\`\`\`typescript
import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: number;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');
  const socketRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const connect = () => {
      socketRef.current = new WebSocket('ws://localhost:8080');
      
      socketRef.current.onopen = () => {
        setConnected(true);
        console.log('Connected to chat server');
      };
      
      socketRef.current.onmessage = (event) => {
        const message: Message = JSON.parse(event.data);
        setMessages(prev => [...prev, message]);
      };
      
      socketRef.current.onclose = () => {
        setConnected(false);
        console.log('Disconnected from chat server');
        
        // Attempt to reconnect after 3 seconds
        setTimeout(connect, 3000);
      };
      
      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    };

    if (username) {
      connect();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [username]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (inputValue.trim() && socketRef.current && connected) {
      const message: Message = {
        id: Date.now().toString(),
        user: username,
        content: inputValue.trim(),
        timestamp: Date.now(),
      };
      
      socketRef.current.send(JSON.stringify(message));
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!username) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Join Chat</h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && setUsername(username)}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Real-time Chat</h1>
        <p className="text-sm">
          {connected ? 'Connected' : 'Disconnected'} as {username}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={\`flex \${message.user === username ? 'justify-end' : 'justify-start'}\`}
          >
            <div
              className={\`max-w-xs lg:max-w-md px-4 py-2 rounded-lg \${
                message.user === username
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800'
              }\`}
            >
              <p className="text-sm font-semibold">{message.user}</p>
              <p>{message.content}</p>
              <p className="text-xs opacity-75 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!connected}
          />
          <button
            onClick={sendMessage}
            disabled={!connected || !inputValue.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
\`\`\`

### Enhanced Server with Express and Socket.IO

\`\`\`javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store connected users and rooms
const users = new Map();
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining
  socket.on('join', ({ username, room }) => {
    const user = {
      id: socket.id,
      username,
      room
    };
    
    users.set(socket.id, user);
    socket.join(room);
    
    // Add user to room
    if (!rooms.has(room)) {
      rooms.set(room, new Set());
    }
    rooms.get(room).add(socket.id);
    
    // Notify room about new user
    socket.to(room).emit('userJoined', {
      username,
      message: \`\${username} joined the room\`,
      timestamp: Date.now()
    });
    
    // Send room user list
    const roomUsers = Array.from(rooms.get(room))
      .map(id => users.get(id))
      .filter(Boolean);
    
    io.to(room).emit('roomUsers', roomUsers);
  });

  // Handle messages
  socket.on('message', (data) => {
    const user = users.get(socket.id);
    if (user) {
      const message = {
        id: Date.now().toString(),
        user: user.username,
        content: data.content,
        timestamp: Date.now(),
        room: user.room
      };
      
      // Broadcast to room
      io.to(user.room).emit('message', message);
      
      // Store message (in production, save to database)
      console.log(\`Message in \${user.room}:\`, message);
    }
  });

  // Handle typing indicators
  socket.on('typing', () => {
    const user = users.get(socket.id);
    if (user) {
      socket.to(user.room).emit('userTyping', {
        username: user.username,
        typing: true
      });
    }
  });

  socket.on('stopTyping', () => {
    const user = users.get(socket.id);
    if (user) {
      socket.to(user.room).emit('userTyping', {
        username: user.username,
        typing: false
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      // Remove from room
      if (rooms.has(user.room)) {
        rooms.get(user.room).delete(socket.id);
        if (rooms.get(user.room).size === 0) {
          rooms.delete(user.room);
        }
      }
      
      // Notify room about user leaving
      socket.to(user.room).emit('userLeft', {
        username: user.username,
        message: \`\${user.username} left the room\`,
        timestamp: Date.now()
      });
      
      users.delete(socket.id);
    }
    
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Advanced Real-time Features

### Real-time Notifications System

\`\`\`typescript
// Notification service
class NotificationService {
  private socket: WebSocket | null = null;
  private listeners: Map<string, Set<Function>> = new Map();

  connect(userId: string) {
    this.socket = new WebSocket(\`ws://localhost:8080?userId=\${userId}\`);
    
    this.socket.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      this.handleNotification(notification);
    };
  }

  subscribe(type: string, callback: Function) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(callback);
  }

  unsubscribe(type: string, callback: Function) {
    this.listeners.get(type)?.delete(callback);
  }

  private handleNotification(notification: any) {
    const callbacks = this.listeners.get(notification.type);
    if (callbacks) {
      callbacks.forEach(callback => callback(notification));
    }
  }
}

// React hook for notifications
const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const serviceRef = useRef<NotificationService>(new NotificationService());

  useEffect(() => {
    const service = serviceRef.current;
    
    service.subscribe('message', (notification) => {
      setNotifications(prev => [...prev, notification]);
    });

    service.subscribe('mention', (notification) => {
      // Show desktop notification for mentions
      if (Notification.permission === 'granted') {
        new Notification('You were mentioned!', {
          body: notification.content,
          icon: '/notification-icon.png'
        });
      }
    });

    return () => {
      service.disconnect();
    };
  }, []);

  return { notifications, service: serviceRef.current };
};
\`\`\`

### Live Collaborative Editing

\`\`\`typescript
// Operational Transform for collaborative editing
class OperationalTransform {
  static transform(op1: Operation, op2: Operation): [Operation, Operation] {
    if (op1.type === 'insert' && op2.type === 'insert') {
      if (op1.position <= op2.position) {
        return [
          op1,
          { ...op2, position: op2.position + op1.text.length }
        ];
      } else {
        return [
          { ...op1, position: op1.position + op2.text.length },
          op2
        ];
      }
    }
    
    if (op1.type === 'delete' && op2.type === 'insert') {
      if (op1.position <= op2.position) {
        return [
          op1,
          { ...op2, position: op2.position - op1.length }
        ];
      } else {
        return [
          { ...op1, position: op1.position + op2.text.length },
          op2
        ];
      }
    }
    
    // Handle other operation combinations...
    return [op1, op2];
  }
}

// Collaborative text editor component
const CollaborativeEditor: React.FC = () => {
  const [content, setContent] = useState('');
  const [cursors, setCursors] = useState<Map<string, number>>(new Map());
  const socketRef = useRef<WebSocket | null>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8080/editor');
    
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'operation':
          applyOperation(data.operation);
          break;
        case 'cursor':
          setCursors(prev => new Map(prev.set(data.userId, data.position)));
          break;
      }
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    const operation = generateOperation(content, newContent);
    
    setContent(newContent);
    
    if (socketRef.current && operation) {
      socketRef.current.send(JSON.stringify({
        type: 'operation',
        operation
      }));
    }
  };

  const handleCursorChange = () => {
    if (editorRef.current && socketRef.current) {
      const position = editorRef.current.selectionStart;
      socketRef.current.send(JSON.stringify({
        type: 'cursor',
        position
      }));
    }
  };

  return (
    <div className="relative">
      <textarea
        ref={editorRef}
        value={content}
        onChange={handleTextChange}
        onSelect={handleCursorChange}
        className="w-full h-96 p-4 border rounded-md font-mono"
      />
      
      {/* Render other users' cursors */}
      {Array.from(cursors.entries()).map(([userId, position]) => (
        <div
          key={userId}
          className="absolute bg-blue-500 w-0.5 h-6 pointer-events-none"
          style={{ 
            left: \`\${getPositionX(position)}px\`,
            top: \`\${getPositionY(position)}px\`
          }}
        />
      ))}
    </div>
  );
};
\`\`\`

## Performance and Scalability

### Connection Management

\`\`\`javascript
// Redis adapter for Socket.IO scaling
const redis = require('redis');
const redisAdapter = require('socket.io-redis');

const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
});

io.adapter(redisAdapter({ 
  host: 'localhost', 
  port: 6379 
}));

// Connection limits and health monitoring
const connectionLimits = {
  maxConnections: 10000,
  rateLimitWindow: 60000, // 1 minute
  maxConnectionsPerIP: 50
};

const connectionTracker = new Map();

io.use((socket, next) => {
  const clientIP = socket.request.connection.remoteAddress;
  const now = Date.now();
  
  // Clean old entries
  for (const [ip, data] of connectionTracker) {
    if (now - data.lastConnection > connectionLimits.rateLimitWindow) {
      connectionTracker.delete(ip);
    }
  }
  
  // Check rate limits
  const clientData = connectionTracker.get(clientIP) || {
    connections: 0,
    lastConnection: now
  };
  
  if (clientData.connections >= connectionLimits.maxConnectionsPerIP) {
    return next(new Error('Rate limit exceeded'));
  }
  
  clientData.connections++;
  clientData.lastConnection = now;
  connectionTracker.set(clientIP, clientData);
  
  next();
});
\`\`\`

### Message Queuing and Persistence

\`\`\`javascript
// Redis for message queuing
const Queue = require('bull');
const messageQueue = new Queue('message processing', {
  redis: {
    host: 'localhost',
    port: 6379
  }
});

// Process messages asynchronously
messageQueue.process('processMessage', async (job) => {
  const { message, room } = job.data;
  
  // Save to database
  await saveMessageToDatabase(message);
  
  // Send push notifications
  await sendPushNotifications(message, room);
  
  // Update search index
  await updateSearchIndex(message);
});

// Add message to queue
io.on('connection', (socket) => {
  socket.on('message', (data) => {
    // Immediate broadcast for real-time experience
    socket.to(data.room).emit('message', data);
    
    // Queue for processing
    messageQueue.add('processMessage', {
      message: data,
      room: data.room
    });
  });
});
\`\`\`

## Security Considerations

### Authentication and Authorization

\`\`\`javascript
const jwt = require('jsonwebtoken');

// JWT middleware for WebSocket
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  
  if (!token) {
    return next(new Error('Authentication error'));
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new Error('Authentication error'));
    }
    
    socket.userId = decoded.userId;
    socket.userRole = decoded.role;
    next();
  });
});

// Room-based authorization
socket.on('joinRoom', (roomId) => {
  // Check if user has permission to join room
  if (hasRoomPermission(socket.userId, roomId)) {
    socket.join(roomId);
  } else {
    socket.emit('error', { message: 'Access denied' });
  }
});
\`\`\`

### Input Validation and Sanitization

\`\`\`javascript
const validator = require('validator');
const DOMPurify = require('dompurify');

const validateMessage = (message) => {
  // Check message length
  if (!message.content || message.content.length > 1000) {
    throw new Error('Invalid message length');
  }
  
  // Sanitize HTML content
  message.content = DOMPurify.sanitize(message.content);
  
  // Validate user input
  if (!validator.isAlphanumeric(message.user, 'en-US', { ignore: ' _-' })) {
    throw new Error('Invalid username');
  }
  
  return message;
};

socket.on('message', (data) => {
  try {
    const validMessage = validateMessage(data);
    // Process valid message
  } catch (error) {
    socket.emit('error', { message: error.message });
  }
});
\`\`\`

## Conclusion

WebSockets enable powerful real-time applications that provide immediate, interactive experiences. By understanding the fundamentals, implementing proper architecture patterns, and considering performance and security, you can build robust real-time applications that scale effectively.

Key takeaways:
- **Plan for scale** from the beginning with proper architecture
- **Implement proper error handling** and reconnection logic
- **Secure your WebSocket connections** with authentication and validation
- **Monitor performance** and optimize for your specific use cases
- **Use appropriate tools** like Socket.IO for production applications

Real-time applications open up new possibilities for user engagement and collaboration, making them essential for modern web development.

## Additional Resources

- [WebSocket API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Socket.IO Documentation](https://socket.io/docs/)
- [Real-time Web Technologies Guide](https://www.html5rocks.com/en/tutorials/websockets/basics/)
- [Operational Transform Algorithm](https://operational-transformation.github.io/)
- [WebSocket Security Best Practices](https://owasp.org/www-community/attacks/WebSocket_security)
`,
    author: "Jireh Custodio",
    authorBio: "Computer Engineering graduate and Full-Stack Developer specializing in cloud computing, cybersecurity, and modern web technologies. Currently working as IT Support Engineer at LGU Naga City.",
    authorImage: "/authors/jireh-custodio.jpg",
    date: "2024-12-15",
    readTime: "9 min read",
    category: "Development",
    tags: ["WebSocket", "Real-time", "JavaScript", "Node.js", "Chat"],
    image: "/blog/websockets-hero.jpg",
    featured: false,
    likes: 87,
    views: 1945,
    publishedAt: "2024-12-15T11:00:00Z",
    updatedAt: "2024-12-15T11:00:00Z"
  }
];

// Helper function to get article by ID
export function getArticleById(id: number): Article | undefined {
  return articlesData.find(article => article.id === id);
}

// Helper function to get all articles
export function getAllArticles(): Article[] {
  return articlesData;
}

// Helper function to get featured articles
export function getFeaturedArticles(): Article[] {
  return articlesData.filter(article => article.featured);
}

// Helper function to get articles by category
export function getArticlesByCategory(category: string): Article[] {
  if (category === "All") return articlesData;
  return articlesData.filter(article => article.category === category);
}

// Helper function to search articles
export function searchArticles(query: string): Article[] {
  const lowercaseQuery = query.toLowerCase();
  return articlesData.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.excerpt.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
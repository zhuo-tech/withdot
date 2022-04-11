import { cloud } from '@/cloud'
import { CoreAlbum } from '@/model/entity/CoreAlbum'
import { LogicDelete } from '@/model/LogicDelete'
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const DB = cloud.database()

export default class EditService {
    public Editform = reactive({
        visible: false,
        show() {
            this.visible = true
        },
        close() {
            this.visible = false
        },
        form: {
            title: '',
        },
    })
    public subassembly = reactive({         //编辑子组件抽屉参数
        visible: false,
        show() {
            this.visible = true
        },
        close() {
            this.visible = false
        },
    })
    public albumsDetail = reactive({})
    public workPage = reactive({
        current: 1,
        pageSize: 5,
        total: 100,
    })
    private route = useRoute()

    public getWorkListData = () => {
    }

    public getUrl_Id = (): string => {
        const {query} = this.route
        return query._id as string
    }

    public async getAlbumsList() {
        const res = await DB.collection(CoreAlbum.TABLE_NAME)
            .where({
                _id: this.getUrl_Id,
                delFlag: LogicDelete.NORMAL,
            })
            .getOne()
        if (!res.ok) {
            ElMessage.error(res.error)
            return
        }
        this.albumsDetail = res.data
    }
}
